import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';
import { GroupApptInviteUserComponent } from '../group-appt-invite-user/group-appt-invite-user.component';

@Component({
  selector: 'app-group-appt-details',
  templateUrl: './group-appt-details.component.html',
  styleUrls: ['./group-appt-details.component.css']
})
export class GroupApptDetailsComponent extends BaseComponent implements OnInit {
  model: GroupApptModel = new GroupApptModel();
  id: string;
  token: string;
  @ViewChild('groupApptInviteModal') groupApptInviteModal: GroupApptInviteUserComponent;

  constructor(public authenticationService: AuthenticationService,
    private groupApptService: GroupApptService,
    private dialog: CommonDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    super(authenticationService);
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity();
      }
    });
  }

  ngOnInit(): void {
  }

  getEntity() {
    this.groupApptService.GetIncludeByID(this.id).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
  }

  completedAppt() {
    this.dialog.showSwalConfirmAlert('Are you sure you want to Completed this Group Appointment?').then(isConfirmed => {
      if (isConfirmed) {
        this.model.Status = "Completed";
        this.groupApptService.Update(this.model).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess('Completed Group Appt', MessageConstant.REQUEST_SUCCESS_CONST);
            this.router.navigateByUrl(`/management/group-appt`);
          }
        });
      }
    });
  }

  cancelledApp() {
    this.dialog.showSwalConfirmAlert('Are you sure you want to Cancel this Group Appointment?').then(isConfirmed => {
      if (isConfirmed) {
        this.model.Status = "Cancelled";
        this.groupApptService.Cancelled(this.model.ID).subscribe(r => {
          if (r) {
            this.dialog.showToastrSuccess('Cancelled Group Appt', MessageConstant.REQUEST_SUCCESS_CONST);
            this.router.navigateByUrl(`/management/group-appt`);
          }
        });
      }
    });
  }

  getToken() {
    if (this.id) {
      this.groupApptService.createMeetingToken(this.id).subscribe(r => {
        this.token = r;
      });
    }
  }

  onClosed(event) {
    this.token = '';
  }

  inviteUser() {
    this.groupApptInviteModal.groupApptID = this.id;
    this.groupApptInviteModal.show();
  }
}
