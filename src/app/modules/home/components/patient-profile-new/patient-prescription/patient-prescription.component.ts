import { PrescriptionStatusType } from './../../../../common/models/allergy-info.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { DosePatientPrescription, MedicationStatusEnum } from 'src/app/modules/common/models/allergy-info.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-patient-prescription-new',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css'],
  providers:[DatePipe]
})
export class PatientPrescriptionNewComponent extends BaseComponent implements OnInit {
  @Input() patientId: string;
  @Input() isGetRouter: boolean;
  results: Array<DosePatientPrescription> = new Array<DosePatientPrescription>();
  constructor(authService: AuthenticationService,
    activeRouter: ActivatedRoute,
    private patientProfileService: PatientProfileService,
    private datePipe: DatePipe) {
    super(authService);
    if (!this.isGetRouter) {
      activeRouter.parent.params.subscribe(r => {
        if (r && r['{id}'] && !this.patientId) {
          this.patientId = r['{id}'];
        }
        else {
          this.patientId = this.currentUser.Id;
        }
      });
    }
  }

  ngOnInit(): void {
    this.search();
  }



  search() {
    if (this.patientId) {
      this.patientProfileService.GetPatientPrescriptionByPatient(this.patientId).subscribe(r => {
        this.results = r;
        setTimeout(() => {
          this.RegisterTable();
        }, 200);
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

  getStatus(status: PrescriptionStatusType) {
    for (var enumMember in PrescriptionStatusType) {
      var value = parseInt(enumMember);
      if (value >= 0 && value == status) {
        return PrescriptionStatusType[enumMember];
      }
    }
  }

  RegisterTable() {
    $('#precriptionsTable').DataTable({
      responsive: true,
      "bProcessing": true,
      "sPaginationType": "simple",
      "aaSorting": [[1, "desc"]],
      "bPaginate": true,
      'bFilter': false,
      'bSort': true,
      'bInfo': true,
      "bLengthChange": false,
      "language": {
        "lengthMenu": "Display _MENU_ records per page",
        "zeroRecords": "Nothing found - sorry",
        "info": "_PAGE_ of _PAGES_ PAGES",
        "infoEmpty": "No records available",
        "infoFiltered": "(filtered from _MAX_ total records)"
      }
    });
  }

  transformEffectiveDate(data) {
    if(!data) return '';
    data = data.replace('Z' , '');
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }
}
