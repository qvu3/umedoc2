import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { type } from 'jquery';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginHistoryModel } from 'src/app/modules/common/models/login-history.model';
import { LoginHistoryService } from 'src/app/modules/common/services/login-history.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-patient-sign-in',
  templateUrl: './patient-sign-in.component.html',
  styleUrls: ['./patient-sign-in.component.css']
})
export class PatientSignInComponent extends BaseComponent implements OnInit {
  returnUrl: string;
  model: UserModel;
  isError: boolean = false;
  Submitting: boolean = false;
  typePass: string = 'password';
  errorMessage: string = "Password or Email incorrect.";
  loginHistoryModel: LoginHistoryModel;
  ipAddress: string;
  isRemember:boolean =false;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public authenticateService: AuthenticationService,
    private loginHistoryService: LoginHistoryService,
    private deviceService: DeviceDetectorService,
    private translateService: TranslateService) {
    super(authenticateService);
    activeRoute.parent.params.subscribe(r => {
      this.model = new UserModel();
      this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
      this.GetUserName();
    });
  }

  ngOnInit() {
    this.GetIPAddress();
  }

  showPassword() {
    this.typePass = this.typePass == 'password' ? 'text' : 'password';
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
      }
      else if (curUser.Role == 'Provider') {
        if (this.currentUser.IsVerified) {
          if (this.returnUrl && this.returnUrl != '/') {
            window.location.href = (this.returnUrl);
          }
          else {
            window.location.href = (`/management/requested-appointments`);
          }
        } else {
          window.location.href = (`/management/edit-my-profile/provider-storages`);
        }
      }
      else {
        window.location.href = (`/management/requested-appointments`);
      }
    }
  }

  login() {
    this.isError = false;
    this.Submitting = true;
    if(this.isRemember){
      localStorage.setItem('Umedoc_IsRememberMe' , this.model.Email);
    }
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
            PhoneNumberConfirmed: result.PhoneNumberConfirmed,
            IsVerified: result.IsVerified
          }));

          // Write login history after login success
          this.writeLoginHistory();

          // redirect url
          this.redirectUrl();

        } else {
          this.isError = false;
        }
      },
        error => {
          if (error.status == 410) {
            this.authenticateService.SetCurrentUser(JSON.stringify(error.error));
            this.router.navigateByUrl(`/auth/sms-verify`);
            return;
          }
          this.Submitting = false;
          this.isError = true;
          this.errorMessage = error.status == 401 ? error.error : "Password or Email incorrect.";
        });
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

  GetUserName(){
    var username = localStorage.getItem('Umedoc_IsRememberMe');
    if(username){
      this.model.Email = username;
    }
  }

}
