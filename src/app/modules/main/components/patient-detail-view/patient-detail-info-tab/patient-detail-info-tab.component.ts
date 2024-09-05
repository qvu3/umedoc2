import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-detail-info-tab',
  templateUrl: './patient-detail-info-tab.component.html',
  styleUrls: ['./patient-detail-info-tab.component.css']
})
export class PatientDetailInfoTabComponent implements OnInit {
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
