import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-task-list-tab',
  templateUrl: './patient-task-list-tab.component.html',
  styleUrls: ['./patient-task-list-tab.component.css']
})
export class PatientTaskListTabComponent implements OnInit {
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
