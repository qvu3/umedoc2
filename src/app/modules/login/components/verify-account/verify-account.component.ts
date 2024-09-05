import { Component, OnInit } from '@angular/core';
import { EmailConfirmModel, EmailConfirmData } from 'src/app/modules/common/models/email-confirm.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  model: EmailConfirmModel = null;
  userId: string;
  code: string;
  returnUrl: string;
  criteria: EmailConfirmData = new EmailConfirmData();
  constructor(private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {
    activeRoute.queryParams.subscribe(r => {
      this.criteria.UserId = r["userId"];
      this.criteria.Code = r["code"];
      this.criteria.ReturnUrl = r["returnUrl"];
      if (this.criteria.UserId && this.criteria.Code && this.criteria.ReturnUrl) {
        this.emailConfirm(this.criteria);
      }
    });
  }

  ngOnInit() {
  }

  emailConfirm(criteria) {
    this.userService.EmailConfirmation(criteria).subscribe(r => {
      this.model = r;
    });
  }
}

