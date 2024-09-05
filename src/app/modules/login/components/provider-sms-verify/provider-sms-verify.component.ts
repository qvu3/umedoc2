import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { ResendSmsRegisterComponent } from '../resend-sms-register/resend-sms-register.component';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-provider-sms-verify',
  templateUrl: './provider-sms-verify.component.html',
  styleUrls: ['./provider-sms-verify.component.css']
})
export class ProviderSmsVerifyComponent extends BaseComponent implements OnInit {
  model: UserModel = new UserModel();
  Submitting: boolean = false;
  entry = '';
  isTokenExpired: boolean = false;
  @ViewChild('resendModal') resendModal: ResendSmsRegisterComponent;
  constructor(
    authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private dialog: CommonDialogService
  ) {
    super(authService);
  }

  ngOnInit() { }

  send() {

    this.entry = sessionStorage.getItem(Global.currentUser);
    if (this.entry) {
      // logged in so return true
      // Check whether the token is expired and return
      const tk = JSON.parse(this.entry) as UserModel;
      this.isTokenExpired = jwtHelper.isTokenExpired(tk.access_token);
    }

    if (!this.entry || this.isTokenExpired) {
      sessionStorage.removeItem(Global.currentUser);
      this.dialog.showSwalConfirmAlertNoCancel("Session expired. Please login again!", false, "OK").then((isConfirm => {
        if (isConfirm) {
          this.router.navigate(['/auth/sign-in']);
          return;
        }
      }));
    }
    else {
      this.Submitting = true;
      this.userService
        .VerifySMS(this.model.SMSVerificationCode)
        .subscribe(
          r => {
            var user = this.authenticationService.GetCurrentUser();
            if (user) {
              user.PhoneNumberConfirmed = true;
              this.authenticationService.SetCurrentUser(JSON.stringify(user));
            }
            this.dialog.showToastrSuccess(
              'SMS Verification',
              'Your account is activated!'
            );
            this.router.navigate(['/auth/provider-finished-registration']);
          },
          error => {
            this.Submitting = false;
            this.dialog.showToastrError(
              'SMS Verification',
              error.error ?? 'This sms code not exist in our system.'
            );
            return;
          }
        );
    }
  }

  didGetVerification() {
    var user = this.authenticationService.GetCurrentUser();
    this.resendModal.show(user.Id);
  }
}