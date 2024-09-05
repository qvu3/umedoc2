import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
 import { BaseComponent } from 'src/app/modules/base.component';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';
import { GroupApptItemComponent } from './group-appt-item/group-appt-item.component';

@Component({
  selector: 'app-group-appt',
  templateUrl: './group-appt.component.html',
  styleUrls: ['./group-appt.component.css']
})
export class GroupApptComponent extends BaseComponent implements OnInit {

  modelList: Array<GroupApptModel> = new Array<GroupApptModel>();
  @ViewChild('groupApptItem') groupApptItem: GroupApptItemComponent;
  constructor(public authenticationService: AuthenticationService,
    private groupApptService: GroupApptService,
    private router: Router) {
    super(authenticationService);
  }

  ngOnInit(): void {
   } 

  addGroupAppt() {
    this.groupApptItem.show();
  } 
}
