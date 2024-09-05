import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-login-history',
  templateUrl: './staff-login-history.component.html',
  styleUrls: ['./staff-login-history.component.css']
})
export class StaffLoginHistoryComponent implements OnInit {
  userId:string
  constructor(activeRouter:ActivatedRoute) {
    activeRouter.parent.params.subscribe(r=>{
      if(r && r['{id}']){
        this.userId = r['{id}'];
      }
    })
   }

  ngOnInit(): void {
  }

}
