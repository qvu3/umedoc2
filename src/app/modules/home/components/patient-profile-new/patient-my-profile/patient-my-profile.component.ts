import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UserService } from 'src/app/modules/common/services/user.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-my-profile',
  templateUrl: './patient-my-profile.component.html',
  styleUrls: ['./patient-my-profile.component.css'],
  providers: [DatePipe]
})
export class PatientMyProfileComponent extends BaseComponent implements OnInit {
  patientUser: UserModel = new UserModel();
  model: PatientProfileModel = new PatientProfileModel();
  constructor(public authService: AuthenticationService,
    public userService: UserService,
    private patientProfileService: PatientProfileService,
    private datePipe: DatePipe) {
    super(authService);
  }

  ngOnInit() {
    this.getEntity();
  }

  getEntity() {
    this.patientProfileService.GetIncludePatientUser(this.currentUser.Id).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
  }

  calAgePatient() {
    if (this.model.PatientUser != null && this.model.PatientUser.DOB) {
      var ages = this.calculateAge(new Date(this.model.PatientUser.DOB));
      if (ages) {
        return `(${ages} years old)`;
      }
    }
    return '';
  }

  transformDob(data) {
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }
}
