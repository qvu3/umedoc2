import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-appointment-history-info-tab',
  templateUrl: './patient-appointment-history-info-tab.component.html',
  styleUrls: ['./patient-appointment-history-info-tab.component.css']
})
export class PatientAppointmentHistoryInfoTabComponent implements OnInit {
  patientId:string;
  constructor(activeRouter:ActivatedRoute) {
    activeRouter.parent.params.subscribe(r=>{
      if(r['{id}']){
        this.patientId = r['{id}'];
      }
    })
   }

  ngOnInit(): void {
  }

}
