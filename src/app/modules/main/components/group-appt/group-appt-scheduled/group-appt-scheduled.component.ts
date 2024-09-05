import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { BaseComponent } from 'src/app/modules/base.component';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';

@Component({
  selector: 'app-group-appt-scheduled',
  templateUrl: './group-appt-scheduled.component.html',
  styleUrls: ['./group-appt-scheduled.component.css']
})
export class GroupApptScheduledComponent extends BaseComponent implements OnInit {

  modelList: Array<GroupApptModel> = new Array<GroupApptModel>();
  constructor(public authenticationService: AuthenticationService,
    private groupApptService: GroupApptService,
    private router: Router) {
    super(authenticationService);

    authenticationService.onReloadGroupAppt.subscribe(r => {
      this.getAllGroupAppts();
    });

  }

  ngOnInit(): void {
    this.getAllGroupAppts();
  }

  getAllGroupAppts() {
    this.groupApptService.GetAll(true).subscribe(r => {
      if (r) {
        this.modelList = r;
      }
    });
  }

  viewDetail(id) {
    this.router.navigateByUrl(`/management/group-appt-detail/${id}`);
  }
}