import { Component, OnDestroy, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PrmcHub } from 'src/app/modules/common/services/prmc-hub';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { ProviderProfileComponent } from '../request-appointment/provider-profile/provider-profile.component';

@Component({
  selector: 'app-waiting-room-for-guest',
  templateUrl: './waiting-room-for-guest.component.html',
  styleUrls: ['./waiting-room-for-guest.component.css']
})
export class WaitingRoomForGuestComponent implements OnInit, OnDestroy {
  model: AppointmentModel;
  id: string;
  @ViewChild('modal') modalProfile: ProviderProfileComponent;
  @ViewChild('childModal') public modal: ModalDirective;
  routerName: string;
  urlTokbox: any;
  token: string;
  totalAppt: number = 0;
  timer: any;
  isShowEnableCamButton = true;
  localStream: MediaStream;
  isJoinCallVideo: boolean = false;

  constructor(
    @SkipSelf() private prmcHub: PrmcHub,
    private service: AppointmentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private dialog: CommonDialogService
  ) {
    this.model = new AppointmentModel();
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity(this.id);
      }
    });

    this.prmcHub.onChangeStatusAppointmentNotify.subscribe(params => {
      if (params && params.ID && this.model && params.ID && this.model.ID == params.ID) {
        this.model.AppointmentStatus = params.AppointmentStatus;
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("InSession")) {
          this.isJoinCallVideo = true;
        }
        if (this.model.AppointmentStatus &&
          (this.model.AppointmentStatus.StatusName.startsWith("Completed") || this.model.AppointmentStatus.StatusName.startsWith("Cancelled"))) {
          this.stopLocalStream();
        }
      }
    });

    setTimeout(() => {
      if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("InSession")) {
        this.isJoinCallVideo = true;
      }
    }, 2000);
  }

  enableMicCar() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        this.localStream = stream;
        this.isShowEnableCamButton = false;
      },
        e => {
          this.dialog.showSwalWarningAlert("Enable Camera and Mic",
            "<p>Please refresh this screen and allow camera and microphone access.</p>\
          ", true);
          this.isShowEnableCamButton = true;
        });
  }

  stopLocalStream() {
    if (this.localStream && this.localStream.getTracks) {
      this.localStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }

  onClosed(event) {
    this.isJoinCallVideo = false;
  }

  joinCallVideo() {
    this.isJoinCallVideo = true;
  }

  ngOnDestroy() {
    this.stopLocalStream()
  }

  ngOnInit() {
    this.getTotalAwaiting();
  }

  getTotalAwaiting() {
    if (this.id) {
      this.utilityService.CountHeadWaitingAppointment(this.id).subscribe(r => {
        this.totalAppt = r;
      });

      this.timer = setInterval(() => {
        this.utilityService.CountHeadWaitingAppointment(this.id).subscribe(r => {
          this.totalAppt = r;
        });
      }, 20000);
    }
  }

  setLiked() {
    if (this.id && this.model && !this.model.Liked) {
      this.service.SetLiked(this.id).subscribe(r => {
        if (r)
          this.model.Liked = true;
      });
    }
  }

  getEntity(id) {
    this.service.GetGuestAppointmentInfo(id).subscribe(result => {
      if (result) {
        this.model = result;
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("InSession")) {
          this.isJoinCallVideo = true;
        }
      } else {
        this.router.navigateByUrl(`/404.html`);
      }
    }, erorr => {
      this.router.navigateByUrl(`/404.html`);
    });
  }

  viewProfile(id) {
    this.modalProfile.show(id);
  }
}



