import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import UserModel from 'src/app/modules/common/models/user.model';
import { UserService } from 'src/app/modules/common/services/user.service';
import Global from 'src/app/Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  model: UserModel = new UserModel();
  Submitting: boolean = false;
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
    this.Submitting = true;
    this.userService
      .ForgotPassword(this.model.Email, Global.CompnayID)
      .subscribe(
        r => {
          this.dialog.showSwalSuccesAlert(
            'Forgot Password',
            'Please check your inbox email to recover your password!'
          );
          this.router.navigate(['/']);
        },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert(
            'Forgot Password',
            error.error ?? 'This email address does not exist in our system. You can use this email to sign up for a new account.'
          );
          this.router.navigate(['/']);
        }
      );
  }
}
