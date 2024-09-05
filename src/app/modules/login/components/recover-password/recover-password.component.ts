import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import UserModel from 'src/app/modules/common/models/user.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent extends BaseComponent implements OnInit {
  userId: string;
  code: string;
  isError: boolean = false;
  Submitting: boolean = false;
  model: UserModel = new UserModel();
  constructor(
    authService: AuthenticationService,
    private router: Router,
    private userSevice: UserService,
    private dialog: CommonDialogService,
    activeRouter: ActivatedRoute
  ) {
    super(authService);
    activeRouter.queryParams.subscribe(r => {
      this.userId = r.userId;
      this.code = r.code;
      if (!this.userId || !this.code) {
        this.router.navigate(['/']);
      }
      this.model.Code = this.code;
      this.model.Id = this.userId;
    });
  }

  ngOnInit() { }

  send() {
    this.isError = false;
    this.Submitting = true;
    this.userSevice.RecoverPassword(this.model).subscribe(
      result => {
        if(result){
          this.authenticationService.SetCurrentUser(JSON.stringify({
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
        }
        this.dialog.showSwalSuccesAlert(
          'Reset Password',
          MessageConstant.REQUEST_SUCCESS_CONST
        );
        this.router.navigate(['/']);
      },
      error => {
        this.isError = true;
        this.Submitting = false;
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }
}
