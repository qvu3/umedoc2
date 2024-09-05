import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-ticket-detail',
  templateUrl: './admin-ticket-detail.component.html',
  styleUrls: ['./admin-ticket-detail.component.css']
})
export class AdminTicketDetailComponent implements OnInit {
  ticketId:string;
  constructor(activeRouter:ActivatedRoute) {
    activeRouter.params.subscribe(r=>{
        this.ticketId = r['id'];
    });
   }

  ngOnInit(): void {
  }

}
