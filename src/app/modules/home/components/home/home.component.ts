import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(authService: AuthenticationService,
    private router: Router) {
    super(authService);
    this.checkRequest();
  }

  ngOnInit() {

  }

  checkRequest() {
    if (this.currentUser && this.currentUser.Role) {
      if (this.currentUser.Role == 'Patient') {
        this.router.navigateByUrl('/patient-profile');
      }
      else {
        this.router.navigateByUrl('/management/requested-appointments')
      }
    }
    else {
      this.router.navigateByUrl('/auth/patient-sign-in');
    }
  }

  checkRequestAppointment() {
    if (this.currentUser && this.currentUser.Role && this.currentUser.Role == 'Patient') {
      this.router.navigateByUrl('/request-appointment');
    }
    else {
      this.router.navigateByUrl('/auth/patient-sign-in');
    }
  }

}
