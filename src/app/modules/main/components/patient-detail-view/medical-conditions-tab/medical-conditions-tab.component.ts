import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PatientMedicalConditionAssignmentModel, PatientMedicalConditionModel } from 'src/app/modules/common/models/patient-allergy.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientMedicalConditionService } from 'src/app/modules/common/services/patient-medical-condition.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-medical-conditions-tab',
  templateUrl: './medical-conditions-tab.component.html',
  styleUrls: ['./medical-conditions-tab.component.css']
})
export class MedicalConditionsTabComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel; 
  IsSubmitting: boolean = false;  
  patientId: string; 
  listMedicalConditions: Array<PatientMedicalConditionModel> = new Array<PatientMedicalConditionModel>(); 

  
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService, 
    private patientMedicalConditionService: PatientMedicalConditionService, 
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
    this.getPatientMedicalCondition();  
  } 

  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(id).subscribe(r => {
      this.model = r;
      
      this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
      
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

  changeCheckMedicalCondition(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.MedicalConditionName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientMedicalConditionID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeMedicationCondition(id) {
    var index = this.model.PatientMedicalConditionAssignments.findIndex(c => c.PatientMedicalConditionID == id);
    if (index >= 0) {
      this.model.PatientMedicalConditionAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientMedicalConditionAssignmentModel();
      psa.PatientMedicalConditionID = id;
      this.model.PatientMedicalConditionAssignments.push(psa);
    }
    this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
  } 

  getPatientMedicalCondition() {
    this.patientMedicalConditionService.GetAll().subscribe(r => {
      if (r) {
        this.listMedicalConditions = r;
        this.changeCheckMedicalCondition(this.listMedicalConditions, this.model.PatientMedicalConditionAssignments);
      }
    })
  } 

  save() {
    this.IsSubmitting = true;
    this.patientProfileService.UpdateMedicationConditions(this.model).subscribe(r => {
      this.IsSubmitting = false;
      if (r) {

        this.dialog.showToastrSuccess('Medical Conditions', MessageConstant.REQUEST_SUCCESS_CONST);
 
      }
      else {
        this.dialog.showToastrError('Medical Conditions', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.IsSubmitting = false;
      this.dialog.showToastrError('Medical Conditions', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() {
    this.router.navigate(['/management/manage-patients']);
  }

}
