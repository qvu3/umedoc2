import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AllergyAssignmentModel } from 'src/app/modules/common/models/allergy-info.model';
import { PatientAllergyAssigmentModel, PatientAllergyModel } from 'src/app/modules/common/models/patient-allergy.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientAllergyService } from 'src/app/modules/common/services/patient-allergy.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-allergies-tab',
  templateUrl: './allergies-tab.component.html',
  styleUrls: ['./allergies-tab.component.css']
})
export class AllergiesTabComponent extends BaseComponent implements OnInit, AfterViewInit {
  model: PatientProfileModel;
  IsSubmitting: boolean = false;
  listAllergys: Array<PatientAllergyModel> = new Array<PatientAllergyModel>();
  patientId: string;
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private patientAllergyService: PatientAllergyService,
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
    this.getPatientAllergy();
  }




  changeValueAllergy(event) {
    if (event) {
      let item = this.model.Allergies[event.index];
      if (item) {
        item.Code = event.data.Code;
        item.Name = event.data.Name;
        item.CodeType = event.data.CodeType;
        item.Reaction = event.data.Reaction;
        item.ReactionType = event.data.ReactionType;
        item.StatusType = event.data.StatusType;
      }
    }
  }

  addAllergy() {
    if (!this.model.Allergies) {
      this.model.Allergies = new Array<AllergyAssignmentModel>();
    }
    this.model.Allergies.push(new AllergyAssignmentModel());
  }

  checkExistAllergy(name) {
    if (name && this.model && this.model.Allergies) {
      return this.model.Allergies.filter(x => x.Name === name).length > 1;
    }
    return false;
  }

  deleteAlligery(index) {
    this.model.Allergies.splice(index, 1);
  }



  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(id).subscribe(r => {
      this.model = r;
      this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
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

  changeCheckAllergy(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        item.IsOther = item.AllergyName.trim() == 'Others';
        list.forEach(psa => {
          if (item.ID == psa.PatientAllergyID)
            item.IsChecked = true;
        });
      });
    }
  }

  changeAllergy(id) {
    var index = this.model.PatientAllergyAssignments.findIndex(c => c.PatientAllergyID == id);
    if (index >= 0) {
      this.model.PatientAllergyAssignments.splice(index, 1);
    }
    else {
      var psa = new PatientAllergyAssigmentModel();
      psa.PatientAllergyID = id;
      this.model.PatientAllergyAssignments.push(psa);
    }
    this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
  }

  getPatientAllergy() {
    this.patientAllergyService.GetAll().subscribe(r => {
      if (r) {
        this.listAllergys = r;
        this.changeCheckAllergy(this.listAllergys, this.model.PatientAllergyAssignments);
      }
    })
  }

  validateAllergy() {
    if (this.model && this.model.Allergies) {
      var arr = [];
      this.model.Allergies.forEach(x => {
        var index = arr.findIndex(y => y.Name == x.Name);
        if (index > -1) {
          let item = arr[index];
          if (item) {
            item.count += 1;
          }
        }
        else {
          arr.push({ Name: x.Name, count: 1 });
        }
      });
      if (arr) {
        return !(arr.filter(x => x.count > 1).length > 0);
      }
    }
    return true;
  }

  save() {
    if (!this.validateAllergy()) {
      return;
    }
    this.IsSubmitting = true;
    this.patientProfileService.UpdateAllergies(this.model).subscribe(r => {
      this.IsSubmitting = false;
      if (r) {
        this.dialog.showToastrSuccess('Allergies', MessageConstant.REQUEST_SUCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Allergies', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.IsSubmitting = false;
      this.dialog.showToastrError('Allergies', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() {
    this.router.navigate(['/management/manage-patients']);
  }
}