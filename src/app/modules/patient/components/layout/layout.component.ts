import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BaseComponent } from 'src/app/modules/base.component';
import { ChangePasswordComponent } from 'src/app/modules/common/component/change-password/change-password.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit {
  @ViewChild('changePassModal') changePassModal: ChangePasswordComponent;
  currentYear: number;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthenticationService,
    public idle: Idle,
    public keepalive: Keepalive,
    private router: Router) {
    super(authService);
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    $('body').attr('class', 'horizontal-layout horizontal-menu 2-columns');
    $('body').attr('data-col', '2-column');

    setTimeout(function () {
      $("body").removeClass("fixed-navbar");
    }, 500);

    if (isPlatformBrowser(this.platformId)) {
      // Ide auto logout screen
      this.registerIdle(this.idle, this.keepalive, this.router)
    }
  }

  changepassword() {
    if (this.currentUser)
      this.changePassModal.show(this.currentUser.Id);
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['/']);
  }


}
