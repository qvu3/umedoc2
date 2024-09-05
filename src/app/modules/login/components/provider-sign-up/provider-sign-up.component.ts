import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { LoginHistoryModel } from 'src/app/modules/common/models/login-history.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { LoginHistoryService } from 'src/app/modules/common/services/login-history.service';

@Component({
  selector: 'app-provider-sign-up',
  templateUrl: './provider-sign-up.component.html',
  styleUrls: ['./provider-sign-up.component.css']
})
export class ProviderSignUpComponent extends BaseComponent implements OnInit {
  model: UserModel = new UserModel();
  isError: boolean = false;
  Submitting: boolean = false;
  errorMessage: string = "Password or Email incorrect.";
  loginHistoryModel: LoginHistoryModel;
  ipAddress: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public authenticateService: AuthenticationService,
    private dialog: CommonDialogService,
    private loginHistoryService: LoginHistoryService,
    private deviceService: DeviceDetectorService
  ) {
    super(authenticateService);
  }

  ngOnInit() {
    this.GetIPAddress();
  }

  login() {
    this.authenticateService.Login(this.model.Email, this.model.Password)
      .subscribe(result => {
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
          this.router.navigate(['/management/my-profile']);
        }
      }, error => {
        //this.router.navigateByUrl(`/auth/patient-sign-in`);
        if (error.status == 410) {
          this.authenticateService.SetCurrentUser(JSON.stringify(error.error));
          this.writeLoginHistory();
          this.router.navigateByUrl(`/auth/provider-sms-verify`);
          return;
        } else {
          this.authenticateService.SetCurrentUser(JSON.stringify(error.error));
          this.router.navigateByUrl(`/auth/patient-sign-in`);
          return;
        }
      });
  }

  save() {
    if (this.Submitting) return;
    this.isError = false;
    this.Submitting = true;
    this.errorMessage = "";
    this.model.CompanyID = Global.CompnayID;
    this.authenticateService
      .RegisterProvider(this.model)
      .subscribe(
        result => {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Register Provider', MessageConstant.REQUEST_SUCCESS_CONST);
          this.login();
        },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Register Provider', MessageConstant.FAILURE_REQUEST);
          this.isError = true;
          this.errorMessage = error.error ? error.error : MessageConstant.FAILURE_REQUEST;
        }
      );
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
}
