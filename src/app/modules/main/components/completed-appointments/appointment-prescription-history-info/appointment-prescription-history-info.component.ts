import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';

@Component({
  selector: 'app-appointment-prescription-history-info',
  templateUrl: './appointment-prescription-history-info.component.html',
  styleUrls: ['./appointment-prescription-history-info.component.css']
})
export class AppointmentPrescriptionHistoryInfoComponent implements OnInit {
  patientId: string;
  appointmentId:string;
  constructor(activeRouter:ActivatedRoute , 
    private appointmentService:AppointmentService) { 
    activeRouter.parent.params.subscribe(r=>{
      this.appointmentId = r['{id}']; 
      this.getAppontment(this.appointmentId);
    });
  }

  ngOnInit(): void {
  }

  getAppontment(id){
    this.appointmentService.GetById(id)
    .subscribe(r=>{
        if(r){
          this.patientId = r.PatientID;
        }
    });
  }

}
