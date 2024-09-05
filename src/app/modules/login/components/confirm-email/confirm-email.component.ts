import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent extends BaseComponent implements OnInit {
  userId: string;
  constructor(authService: AuthenticationService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: CommonDialogService) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.userId = r['id'];
      if (!this.userId) {
        this.dialog.showSwalErrorAlert('Confirm Email', 'Your link invalid, please check and try again.');
        this.router.navigate(['/auth/sign-in']);
        return;
      }
    });
  }

  ngOnInit() {

  }

  login() {
    this.router.navigate(['/auth/sign-in']);
  }

  resend() {
    if (this.userId) {
      this.userService.resendConfirm(this.userId).subscribe(r => {
        if (r) {
          this.dialog.showSwalSuccesAlert('Confirm Email', 'Confirmation Email has been re-sent. Please check your inbox again!')
        }
      }, error => {
        this.dialog.showSwalErrorAlert('Confirm Email', 'Occured error during send confirmation email to you. Please contact admin for supporting.')
      })
    }
  }
}
