import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PreCheckModel } from 'src/app/modules/common/models/pre-check.model';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AvailableProviderComponent } from './available-provider/available-provider.component';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
declare var $: any;
@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css']
})
export class RequestAppointmentComponent extends BaseComponent implements OnInit, AfterViewInit {
  preCheckModel: PreCheckModel;
  appointmentModel: AppointmentModel;
  IsUpdateProfile: boolean = false;
  IsScheduler:boolean=false;
  @ViewChild('availableProvider') availableProviderComp: AvailableProviderComponent; 
  constructor(authService: AuthenticationService,
    activeRoute:ActivatedRoute,
    private appoinmentService: AppointmentService,
    private router: Router) { 
    super(authService);
    this.checkPatientRequestedAppointment();
    activeRoute.queryParams.subscribe(r => {
      this.IsScheduler = (r && r['schedule']);
    });
    
  }

  saveAppWizard(event) {
    this.availableProviderComp.reloadProvider(!this.appointmentModel.IsOnDemand);
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.appointmentModel = new AppointmentModel();
    this.appointmentModel.PatientID = this.currentUser.Id;
    this.appointmentModel.PreCheckModel.State = this.currentUser.State;
    this.appointmentModel.IsOnDemand = !this.IsScheduler; 
  }

  checkPatientRequestedAppointment() {
    if (this.currentUser && this.currentUser.Id) {
      this.appoinmentService.CheckPatientRequestedAppointment(this.currentUser.Id).subscribe(r => {
        this.IsUpdateProfile = !r;
      });
    }
  }


}
