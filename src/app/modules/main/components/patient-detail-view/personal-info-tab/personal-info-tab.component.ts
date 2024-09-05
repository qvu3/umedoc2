import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant, NameExtension } from 'src/app/modules/common/constant/message.const';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';

@Component({
  selector: 'app-personal-info-tab',
  templateUrl: './personal-info-tab.component.html',
  styleUrls: ['./personal-info-tab.component.css']
})
export class PersonalInfoTabComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel = new PatientProfileModel();
  id: string;
  companyName: string;
  us_statelist: any;
  IsSubmitting: boolean = false;
  prefixes = NameExtension.prefixes;
  suffixes = NameExtension.suffixes;
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private userService:UserService,
    private dialog: CommonDialogService,
    activeRouter: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router) {
    super(authService);
    activeRouter.parent.params.subscribe(r => {
      if (r && r['{id}']) {
        this.id = r['{id}'];
        this.getEntity(this.id);
      }
    });
  }

  ngOnInit() {
    this.us_statelist = Global.US_StateList;
  }

  getEntity(id) {
    this.model = new PatientProfileModel();
    this.patientProfileService.GetPatientProfileInfo(id).subscribe(r => {
      this.model = r;
      if (this.model.PatientUser) {
        this.model.PatientUser.Prefix = this.model.PatientUser.Prefix ?? "";
        this.model.PatientUser.Suffix = this.model.PatientUser.Suffix ?? "";
        this.model.PatientUser.ProfilePicture = this.model.PatientUser.ProfilePicture ?? "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";
      }
    });
  }
  save() {
    this.IsSubmitting = true;
    this.userService.UpdateProfile(this.model.ID , this.model.PatientUser).subscribe(r => {
      this.IsSubmitting = false;
      if (r) {
       
        this.authService.UpdateCurrentInfo(this.model.PatientUser);
        this.dialog.showToastrSuccess('Patient Info', MessageConstant.REQUEST_SUCCESS_CONST);
      }
      else {
        this.dialog.showToastrError('Patient Info', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.IsSubmitting = false;
      this.dialog.showToastrError('Patient Info', MessageConstant.FAILURE_REQUEST);
    })
  }

  cancel() {
    this.router.navigate(['/management/manage-patients']);
  }

}


