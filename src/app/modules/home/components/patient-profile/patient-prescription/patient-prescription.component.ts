import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { DosePatientPrescription, MedicationStatusEnum } from 'src/app/modules/common/models/allergy-info.model';
declare var $:any;

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css']
})
export class PatientPrescriptionComponent implements OnInit, OnChanges {
  @Input() patientId: number;
  results: Array<DosePatientPrescription> = new Array<DosePatientPrescription>();
  
  constructor(private patientProfileService: PatientProfileService) {

  }

  ngOnInit(): void { 
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.patientId && params.patientId.currentValue && params.patientId.currentValue != params.patientId.previousValue) {
      this.search();
    }
  }

  search() {
    if (this.patientId) {
      this.patientProfileService.GetPatientPrescription(this.patientId).subscribe(r => {
        this.results = r;
        setTimeout(()=>{
          this.RegisterTable();
        },200); 
      });
    }
  }

  getMedicalStatus(status: MedicationStatusEnum) {
    for (var enumMember in MedicationStatusEnum) {
      var value = parseInt(enumMember);
      if (value >= 0 && value == status) {
        return MedicationStatusEnum[enumMember];
      }
    }
  }

  RegisterTable(){
    $('#precriptionsTable').DataTable({
      responsive: true, 
      "bProcessing": true, 
      "sPaginationType": "simple", 
      "aaSorting": [[1, "desc"]],
      "bPaginate": true, 
      'bFilter':  false ,
      'bSort': true,
      'bInfo': true,
      "bLengthChange":  false, 
      "language": {
        "lengthMenu": "Display _MENU_ records per page",
        "zeroRecords": "Nothing found - sorry",
        "info": "_PAGE_ of _PAGES_ PAGES",
        "infoEmpty": "No records available",
        "infoFiltered": "(filtered from _MAX_ total records)"
      }
    });
  }
}
