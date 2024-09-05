import { Component, OnInit, ViewChild } from '@angular/core';
import Global from 'src/app/Global';
import { MessageConstant, NameExtension } from 'src/app/modules/common/constant/message.const';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
declare var gtag: any;

@Component({
  selector: 'app-provider-finish-sign-up',
  templateUrl: './provider-finish-sign-up.component.html',
  styleUrls: ['./provider-finish-sign-up.component.css']
})
export class ProviderFinishSignUpComponent extends BaseComponent implements OnInit {
  returnUrl: string;
  model: UserModel;
  id: string;
  isError: boolean = false;
  Submitting: boolean = false
  errorMessage: string = "Password or Email incorrect.";
  us_statelist: any;
  currentStep = 1;
  @ViewChild('f') f: NgForm;
  prefixes = NameExtension.prefixes;
  suffixes = NameExtension.suffixes;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public authenticateService: AuthenticationService,
    public userService: UserService,
    private dialog: CommonDialogService) {
    super(authenticateService);
    activeRoute.params.subscribe(r => {
      this.model = new UserModel();
      this.getCurrentProfile();
    });
  }

  getCurrentProfile() {
    this.userService.GetCurrent().subscribe(r => {
      if (r) {
        this.model = r;
        if (!this.model.Prefix) this.model.Prefix = "";
        if (!this.model.Suffix) this.model.Suffix = "";
        if (!this.model.Gender) this.model.Gender = "";
        if (!this.model.State) this.model.State = "";
      }
    });
  }


  ngOnInit() {
    this.model.State = "";
    this.us_statelist = Global.US_StateList;
  }

  runGoogleAds() {
    gtag('event', 'conversion', { 'send_to': 'AW-638647302/JQihCPiZkuEBEIb4w7AC' });
  }

  runBingAds() {
    window.uetq = window.uetq || [];  
    window.uetq.push ('event', 'finishsignup', {'event_category': 'signup', 'event_label': 'finishsignup', 'event_value': 1});
  }

  redirectUrl() {
    var curUser = this.authenticateService.GetCurrentUser();
    if (curUser) {
      if (this.returnUrl && this.returnUrl != '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
      else {
        window.location.href = (`/management`);
      }
    }
  }

  resetForm() {
    var entity = Object.assign({}, this.model);
    this.f.resetForm();
    this.model = entity;
  }

  save() {
    if (this.currentStep < 2) {
      this.currentStep += 1;
      this.resetForm();
      return;
    }
    if (this.Submitting) return;
    this.isError = false;
    this.Submitting = true;
    if (Global.CompnayID) {
      this.model.CompanyID = Global.CompnayID;
      this.authenticateService.UpdatePatientSignUp(this.model)
        .subscribe(result => {
          this.Submitting = false;
          if (result) {
            this.runGoogleAds();
            this.runBingAds();
            this.authenticateService.SetCurrentUser(JSON.stringify({
              access_token: result.access_token,
              expires_in: result.expires_in,
              Email: result.Email,
              Role: result.Role,
              FirstName: result.FirstName,
              LastName: result.LastName,
              Id: result.Id,
              State: result.State,
              CompanyID: result.CompanyID,
              ProfilePicture: result.ProfilePicture,
              Gender: result.Gender,
              DOB: result.DOB,
              PhoneNumberConfirmed: result.PhoneNumberConfirmed
            }));
            this.router.navigate(['/', 'management', 'warning-verified']);
          } else {
            this.dialog.showToastrError('Error', MessageConstant.FAILURE_REQUEST);
          }
        },
          error => {
            this.Submitting = false;
            this.isError = true;
            this.errorMessage = error.error ? error.error : MessageConstant.FAILURE_REQUEST;
          });
    }
    else {
      this.dialog.showToastrError('Error', MessageConstant.FAILURE_REQUEST);
    }
  }
}

