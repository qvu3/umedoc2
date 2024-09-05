import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import Global from 'src/app/Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant, NameExtension } from 'src/app/modules/common/constant/message.const';
import { NgForm } from '@angular/forms';
import { JoyrideService } from 'ngx-joyride';
import { LoginHistoryModel } from 'src/app/modules/common/models/login-history.model';
import { LoginHistoryService } from 'src/app/modules/common/services/login-history.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-patient-sign-up',
  templateUrl: './patient-sign-up.component.html',
  styleUrls: ['./patient-sign-up.component.css']
})
export class PatientSignUpComponent extends BaseComponent implements OnInit {
  returnUrl: string;
  model: UserModel;
  isError: boolean = false;
  Submitting: boolean = false
  errorMessage: string = "Password or Email incorrect.";
  us_statelist: any;
  @ViewChild('f') f: NgForm;
  prefixes = NameExtension.prefixes;
  suffixes = NameExtension.suffixes;
  loginHistoryModel: LoginHistoryModel;
  ipAddress: string;
  constructor(
    private joyrideService: JoyrideService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public authenticateService: AuthenticationService,
    private dialog: CommonDialogService,
    private loginHistoryService: LoginHistoryService,
    private deviceService: DeviceDetectorService) {
    super(authenticateService);
    activeRoute.parent.params.subscribe(r => {
      this.model = new UserModel();
      this.model.RefID = this.activeRoute.snapshot.queryParams['ref-id']||null;
      this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    });
  }


  ngOnInit() {
    this.model.State = "";
    this.us_statelist = Global.US_StateList;
    this.scrollToTop(0, 300);
    this.GetIPAddress();
  }

  resetForm() {
    var entity = Object.assign({}, this.model);
    this.f.resetForm();
    this.model = entity;
  }

  redirectUrl() {
    var curUser = this.authenticateService.GetCurrentUser();
    if (curUser && curUser.Role) {
      if (curUser.Role == 'Patient') {
        if (this.returnUrl && this.returnUrl != '/') {
          window.location.href = (this.returnUrl);
        }
        else {
          window.location.href = (`/patient-profile`);
        }
      } else {
        window.location.href = (`/management/requested-appointments`);
      }
    }
  }

  login() {
    this.authenticateService.Login(this.model.Email, this.model.Password)
      .subscribe(result => {
        this.Submitting = false;
        if (result) {
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
            DOB: result.DOB,
            Gender: result.Gender,
            PhoneNumberConfirmed: result.PhoneNumberConfirmed
          }));
          this.redirectUrl();

        }
      }, error => {
        if (error.status == 410) {
          this.authenticateService.SetCurrentUser(JSON.stringify(error.error));
          this.writeLoginHistory();
          this.router.navigateByUrl(`/auth/sms-verify`);
          return;
        } else {
          this.authenticateService.SetCurrentUser(JSON.stringify(error.error));
          this.router.navigateByUrl(`/auth/patient-sign-in`);
          return;
        }
      });
  }

  save() {
    if (!this.model.IsReadAndAgreed) return;
    if (this.Submitting) return;
    this.isError = false;
    this.Submitting = true;
    if (Global.CompnayID) {
      this.model.CompanyID = Global.CompnayID;
      this.authenticateService.Register(this.model)
        .subscribe(result => {
          this.Submitting = false;
          if (result) {
            this.login();
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

  writeLoginHistory() {
    // Set data for login history
    this.loginHistoryModel = new LoginHistoryModel();
    this.loginHistoryModel.UserAgent = this.deviceService.userAgent;
    this.loginHistoryModel.OS = this.deviceService.os;
    this.loginHistoryModel.Browser = this.deviceService.browser;
    this.loginHistoryModel.DeviceName = this.deviceService.device;
    this.loginHistoryModel.OS_Version = this.deviceService.os_version;
    this.loginHistoryModel.Browser_Version = this.deviceService.browser_version;
    this.loginHistoryModel.IsDesktop = this.deviceService.isDesktop(this.deviceService.userAgent);
    this.loginHistoryModel.IsMobile = this.deviceService.isMobile(this.deviceService.userAgent);
    this.loginHistoryModel.IsTablet = this.deviceService.isTablet(this.deviceService.userAgent);
    this.loginHistoryModel.IsLoginFromMobileApp = false;
    this.loginHistoryModel.IP = this.ipAddress;

    this.loginHistoryService.Create(this.loginHistoryModel)
      .subscribe(result => {
        if (result) {
          console.log('Write login history success.');
        } else {
          console.log('Write login history error.');
        }
      }, eror => {
        console.log('Write login history error.');
      });
  }

  GetIPAddress() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function (json) {
        this.ipAddress = json.ip;
      }.bind(this)
    );
  }

  selectTreatmentConsent(){
    let lang = sessionStorage.getItem('lang') ?? 'en';
    if(lang && lang =='es'){
      return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Treatment%2BConsent+-+Spanish+Version.docx.pdf";
    }

    return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Treatment+Consent.pdf";
  }
}
