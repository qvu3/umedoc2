import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientMedicationAssignmentModel, PatientMedicationModel } from 'src/app/modules/common/models/patient-allergy.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientMedicationService } from 'src/app/modules/common/services/patient-medication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-medications-tab',
  templateUrl: './medications-tab.component.html',
  styleUrls: ['./medications-tab.component.css']
})
export class MedicationsTabComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel;
  IsSubmitting: boolean = false;
  patientId: string;
  listMedications: Array<PatientMedicationModel> = new Array<PatientMedicationModel>();
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private patientMedicationService: PatientMedicationService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.patientId = r['{id}'];
      }
    });
  }

  ngOnInit() {
    this.getEntity(this.patientId);
    this.getPatientMedication();
  }


  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(id).subscribe(r => {
      this.model = r;
      this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
    });
  }

  checkOtherRequired(source) {
    if (source) {
      for (var i = 0; i < source.length; i++) {
        var item = source[i];
        if (item.IsChecked && item.IsOther) {
          return true;
        }
      }
    }
    return false;
  }



  changeCheckMedication(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.MedicationName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientMedicationID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeMedication(id) {
    var index = this.model.PatientMedicationAssignments.findIndex(c => c.PatientMedicationID == id);
    if (index >= 0) {
      this.model.PatientMedicationAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientMedicationAssignmentModel();
      psa.PatientMedicationID = id;
      this.model.PatientMedicationAssignments.push(psa);
    }
    this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
  }



  getPatientMedication() {
    this.patientMedicationService.GetAll().subscribe(r => {
      if (r) {
        this.listMedications = r;
        this.changeCheckMedication(this.listMedications, this.model.PatientMedicationAssignments);
      }
    })
  }




  save() {

    this.IsSubmitting = true;
    this.patientProfileService.UpdateMedications(this.model).subscribe(r => {
      this.IsSubmitting = false;
      if (r) {
        this.dialog.showToastrSuccess('Patient Profile', MessageConstant.REQUEST_SUCCESS_CONST);

         
      }
      else {
        this.dialog.showToastrError('Patient Profile', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.IsSubmitting = false;
      this.dialog.showToastrError('Patient Profile', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() { 
      this.router.navigate(['/management/manage-patients']); 
  }

  
}
