import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';

@Component({
  selector: 'app-group-appt-completed',
  templateUrl: './group-appt-completed.component.html',
  styleUrls: ['./group-appt-completed.component.css']
})
export class GroupApptCompletedComponent extends BaseComponent implements OnInit {

  modelList: Array<GroupApptModel> = new Array<GroupApptModel>();
  constructor(public authenticationService: AuthenticationService,
    private groupApptService: GroupApptService) {
    super(authenticationService);
    authenticationService.onReloadGroupAppt.subscribe(r => {
      this.getAllGroupAppts();
    });

  }

  ngOnInit(): void {
    this.getAllGroupAppts();
  }

  getAllGroupAppts() {
    this.groupApptService.GetAll(false).subscribe(r => {
      if (r) {
        this.modelList = r;
      }
    });
  }
}
