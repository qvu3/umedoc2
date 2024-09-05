import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { VaccineApptModel } from 'src/app/modules/common/models/vaccin-appt.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-confirm-vaccine-schedule-appointment',
  templateUrl: './confirm-vaccine-schedule-appointment.component.html',
  styleUrls: ['./confirm-vaccine-schedule-appointment.component.css'],
  providers:[DatePipe]
})
export class ConfirmVaccineScheduleAppointmentComponent extends BaseComponent implements OnInit {
  id:string;
  model:VaccineApptModel = new VaccineApptModel();
  constructor(authService:AuthenticationService , 
    private activeRouter:ActivatedRoute,
    private dialog:CommonDialogService,
    private appointmentService:AppointmentService,
    private router:Router,
    private datePipe: DatePipe) {
    super(authService);
    activeRouter.params.subscribe(r=>{
      if(r && r['id']){
        this.id = r['id'];
        this.getEntity(this.id);
      }
      else{ 
        router.navigateByUrl('/');
      }
    })
   }

  ngOnInit(): void {
  }
  
  transformDob(data) {
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }

  getEntity(id){
    this.appointmentService.GetIncludeVaccineScheduleApptById(id).subscribe(r=>{
      this.model = r;
      if(this.model.ApptStatus?.StatusName != 'Requested'){
        this.dialog.showSwalWarningAlert('Vaccine Appointment', 'Your appointment is in progress');
        this.router.navigateByUrl('/');
      }
    });
  }

}
