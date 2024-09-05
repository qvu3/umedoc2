import { DatePipe } from '@angular/common';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { AppointmentPrescriptionDocumentService } from './../../../../../common/services/appointment-prescription-document.service';
import { DosePatientPrescription, PrescriptionStatusType } from 'src/app/modules/common/models/allergy-info.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AppointmentDocumentService } from 'src/app/modules/common/services/appointment-document.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentDocumentModel } from './../../../../../common/models/appointment-document.model';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrizmNoteSendModel } from 'src/app/modules/common/models/prizm-note-send.model';

@Component({
  selector: 'app-prizm-send-prescription-modal',
  templateUrl: './prizm-send-prescription-modal.component.html',
  styleUrls: ['./prizm-send-prescription-modal.component.css'],
  providers: [DatePipe]
})
export class PrizmSendPrescriptionModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PrizmNoteSendModel = new PrizmNoteSendModel();
  patientId: string = "";
  appointmentId: string = "";
  documents: AppointmentDocumentModel[] = [];
  results: Array<DosePatientPrescription> = new Array<DosePatientPrescription>();
  constructor(public authService: AuthenticationService,
    private appointmentDocumentService: AppointmentDocumentService,
    private appointmentService: AppointmentService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private datePipe: DatePipe) {
    super(authService);
  }

  ngOnInit(): void {

  }

  selectPrescription(item: DosePatientPrescription) {
    item.checked = !item.checked;
  }

  getPrescriptionByPatient(patientId) {
    if (patientId) {
      this.patientProfileService.GetPatientPrescriptionByPatient(patientId).subscribe(r => {
        this.results = r;
      });
    }
  }


  save() {
    var checkedList = this.results.filter(x => x.checked);
    if (checkedList && checkedList.length > 0) {
      this.model.Prescriptions = checkedList;
      //generate pdf
      this.Submitting = true;
      this.appointmentService.SendPrizmPatientPrescriptions(this.model).subscribe(result => {
        if (result && result.status) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Send Prizm Prescriptions', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Send Prizm Prescriptions', result.message ?? MessageConstant.FAILURE_REQUEST);
        }
      }, error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Send Prizm Prescriptions', MessageConstant.FAILURE_REQUEST);
      });
    }
    else {
      this.dialog.showToastrError('Prescription Generate PDF', 'Please select at least a prescription');
    }
  }

  show(appointmentId, patientId) {
    if (appointmentId && patientId) {
      this.model.AppointmentID = appointmentId;
      this.model.PatientID = patientId;
      this.getPrescriptionByPatient(patientId);
      this.modal.show();
    }
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
    this.closeModal.emit(true);
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
    if (!data) return '';
    data = data.replace('Z', '');
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }
}
