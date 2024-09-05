import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-ticket-detail',
  templateUrl: './patient-ticket-detail.component.html',
  styleUrls: ['./patient-ticket-detail.component.css']
})
export class PatientTicketDetailComponent implements OnInit {
  ticketId:string;
  constructor(private activeRouter:ActivatedRoute) {
    activeRouter.params.subscribe(r=>{
        this.ticketId = r['id'];
    });
   }

  ngOnInit(): void {
  }

}
