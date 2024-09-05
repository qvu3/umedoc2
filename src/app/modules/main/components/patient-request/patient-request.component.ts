import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientRequestCriteria } from './../../../common/criterias/patient-request.criteria';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-patient-request',
  templateUrl: './patient-request.component.html',
  styleUrls: ['./patient-request.component.css']
})
export class PatientRequestComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: PatientRequestCriteria = new PatientRequestCriteria();

  constructor(public authService: AuthenticationService) {
    super(authService);
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  search() {
    if (this.authService.onReloadPatientRequestTable) {
      this.authService.onReloadPatientRequestTable.emit(true);
    }
  }

}