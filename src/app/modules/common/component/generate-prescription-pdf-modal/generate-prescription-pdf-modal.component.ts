import { DatePipe } from '@angular/common';
import { CommonDialogService } from './../../services/dialog.service';
import { AppointmentPrescriptionDocumentService } from './../../services/appointment-prescription-document.service';
import { ModalDirective } from 'ngx-bootstrap';
import { PatientProfileService } from './../../services/patient-profile.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DosePatientPrescription, PrescriptionStatusType } from '../../models/allergy-info.model';

@Component({
  selector: 'app-generate-prescription-pdf-modal',
  templateUrl: './generate-prescription-pdf-modal.component.html',
  styleUrls: ['./generate-prescription-pdf-modal.component.css'],
  providers:[DatePipe]
})
export class GeneratePrescriptionPdfModalComponent implements OnInit {
  patientId: string;
  appointmentId:string;
  results: Array<DosePatientPrescription> = new Array<DosePatientPrescription>();
  @ViewChild('childModal') public modal: ModalDirective;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  constructor(private patientProfileService: PatientProfileService ,
    private apptPrescriptionDocumentService:AppointmentPrescriptionDocumentService ,
    private dialog:CommonDialogService ,
    private datePipe:DatePipe) {

  }

  ngOnInit(): void {
  }

  selectPrescription(item: DosePatientPrescription) {
    item.checked = !item.checked;
  }

  getPrescriptionByPatient() {
    if (this.patientId) {
      this.patientProfileService.GetPatientPrescriptionByPatient(this.patientId).subscribe(r => {
        this.results = r;
      });
    }
  }

  generatePDF(){
    var checkedList = this.results.filter(x=>x.checked);
    if(checkedList && checkedList.length >0){
      //generate pdf
      this.Submitting =true;
      this.apptPrescriptionDocumentService.GeneratePDF(this.appointmentId,  checkedList).subscribe(r=>{
        this.Submitting = false;
        this.dialog.showToastrSuccess('Prescription Generate PDF' , 'Generate PDF successfully');
        this.closeModal.emit(true);
        this.hide();
      },error=>{
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Prescription Generate PDF' , 'Occurred error during generate your pdf.');
      });
    }
    else{
      this.dialog.showToastrError('Prescription Generate PDF', 'Please select at least a prescription');
    }
  }

  show(patientId , appointmentId) {
    if (patientId && appointmentId) {
      this.patientId = patientId;
      this.appointmentId = appointmentId
      this.getPrescriptionByPatient();
      this.modal.show();
    }
  }

  hide() {
    this.modal.hide();
  }

  getStatus(status: PrescriptionStatusType) {
    for (var enumMember in PrescriptionStatusType) {
      var value = parseInt(enumMember);
      if (value >= 0 && value == status) {
        return PrescriptionStatusType[enumMember];
      }
    }
  }

  transformEffectiveDate(data) {
    if(!data) return '';
    data = data.replace('Z' , '');
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }
}
