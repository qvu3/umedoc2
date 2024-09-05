import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-history-tab',
  templateUrl: './login-history-tab.component.html',
  styleUrls: ['./login-history-tab.component.css']
})
export class LoginHistoryTabComponent implements OnInit { 
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
