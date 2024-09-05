import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import DailyIframe from '@daily-co/daily-js';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import Global from 'src/app/Global';
import { Router } from '@angular/router';
import { VideoCallHistoryService } from '../../services/video-call-history.service';
import { VideoCallHistoryModel } from '../../models/video-call-history.model';



@Component({
  selector: 'app-video-call-frame',
  templateUrl: './video-call-frame.component.html',
  styleUrls: ['./video-call-frame.component.css']
})
export class VideoCallFrameComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input() appointment: AppointmentModel;
  @Input() token: string;
  @Input() isProvider: boolean = true;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  url: any = null;
  @ViewChild('callFrame') callFrame: ElementRef;
  participantClients: any;
  frame: any;
  callObject: any;
  constructor(private authService: AuthenticationService,
    private cdChanged: ChangeDetectorRef,
    private router: Router,
    private santize: DomSanitizer,
    private appointmentService: AppointmentService,
    private videoCallHistoryService: VideoCallHistoryService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.joinMeeting();
  }

  ngOnChanges(params: SimpleChanges) {

  }

  turnOnCamMic() {
    if (this.participantClients) {
      for (const key in this.participantClients) {
        if (key !== "local") {
          let obj = this.participantClients[key];
          if (obj && obj.session_id) {
            this.frame.sendAppMessage("MIC_CAM", obj.session_id);
          }
        }
      }
    }
  }

  joinMeeting() {
    if (this.appointment && this.appointment.RoomName && this.token) {
      this.frame = DailyIframe.createFrame(this.callFrame.nativeElement, {
        showLeaveButton: true,
        showFullscreenButton: true,
        iframeStyle: {
          width: '100%',
          // height: this.isProvider ? `570px` : `${($(window).height() * 70) / 100}px`
          height: this.isProvider ? `570px` : `95vh`
        }
      });

      this.participantClients = this.frame.join({
        token: this.token,
        url: `${Global.DailyCoUrl}/${this.appointment.RoomName}`,
        lang: 'en'
      });

      this.onChange.emit(this.participantClients);

      this.frame.on("app-message", (event) => {
        console.log(event);
        if (event && event.data && event.data == "MIC_CAM") {
          this.frame.setLocalVideo(true);
          this.frame.setLocalAudio(true);
        }
      });

      this.frame.on('joined-meeting', (event) => {
        //this.frame.setLocalVideo(true); 
        var entity = new VideoCallHistoryModel();
        entity.ApptID = this.appointment.ID;
        entity.IsLeft = false;
        this.addVideoCallHistoryModel(entity);

        this.participantClients = this.frame.participants();
        this.onChange.emit(this.participantClients);
      });

      this.frame.on('participant-joined', (event) => { 
        this.participantClients = this.frame.participants();
        this.onChange.emit(this.participantClients);
      });

      this.frame.on('participant-updated', (event) => {
        this.participantClients = this.frame.participants();
        this.onChange.emit(this.participantClients);
      });

      this.frame.on('participant-left', (event) => {
        this.participantClients = this.frame.participants();
        this.onChange.emit(this.participantClients);
      });

      this.frame.on('left-meeting', (event) => {
        var entity = new VideoCallHistoryModel();
        entity.ApptID = this.appointment.ID;
        entity.IsLeft = true;
        this.addVideoCallHistoryModel(entity);

        this.participantClients = this.frame.participants();
        this.onChange.emit(this.participantClients);
        this.frame.leave();
        this.frame.destroy();
        this.onClosed.emit(true);
      });
    }
  }

  addVideoCallHistoryModel(entity: VideoCallHistoryModel) {
    this.videoCallHistoryService.Create(entity).subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}
