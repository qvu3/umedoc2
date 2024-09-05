import { Component, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { GroupApptModel } from 'src/app/modules/common/models/group-appt.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { GroupApptService } from 'src/app/modules/common/services/group-appt.service';
import { PrmcHub } from 'src/app/modules/common/services/prmc-hub';

@Component({
  selector: 'app-group-appt-waiting-room',
  templateUrl: './group-appt-waiting-room.component.html',
  styleUrls: ['./group-appt-waiting-room.component.css']
})
export class GroupApptWaitingRoomComponent  extends BaseComponent implements OnInit {
  model: GroupApptModel = new GroupApptModel();
  id: string;
  token: string;
  localStream: MediaStream;
  constructor(public authenticationService: AuthenticationService,
    @SkipSelf() private prmcHub: PrmcHub,
    private groupApptService: GroupApptService,
    private dialog: CommonDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    super(authenticationService);
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity(this.id);
      }
    });

    this.prmcHub.onChangeStatusGroupApptNotify.subscribe(params => {
      if (params && params.ID && this.model && params.ID && this.model.ID == params.ID) {
        this.model.Status = params.Status;
        if (this.model.Status && this.model.Status.startsWith("InSession")) {
          if (this.model.ProviderID) {
            this.joinVideoCall();
          } else {
            this.getEntity(this.model.ID);
          }
        }
        if (this.model.Status &&
          (this.model.Status.startsWith("Completed") || this.model.Status.startsWith("Cancelled"))) {
          this.stopLocalStream();
        }
        // if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("Completed")) {
        //   this.runGoogleAds();
        //   this.runBingAds();
        // }
      }
    });

    setTimeout(() => {
      if (this.model.Status && this.model.Status.startsWith("InSession")) {
        this.joinVideoCall();
      }
    }, 2000);
  }

  ngOnInit(): void {
  }

  joinVideoCall() { 
    this.getToken();
  }
  
  getEntity(id) {
    this.groupApptService.GetIncludeByID(id).subscribe(r => {
      if (r) {
        this.model = r;
        if (this.model.Status && this.model.Status == 'InSession') {
          this.joinVideoCall();
        }
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

  stopLocalStream() {
    if (this.localStream && this.localStream.getTracks) {
      this.localStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }

  ngOnDestroy() {
    this.stopLocalStream()
  }
  
  onClosed(event) {
    this.token = '';
  } 
}

