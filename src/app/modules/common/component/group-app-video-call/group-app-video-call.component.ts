import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DailyIframe from '@daily-co/daily-js';
 import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { GroupApptModel } from '../../models/group-appt.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-group-app-video-call',
  templateUrl: './group-app-video-call.component.html',
  styleUrls: ['./group-app-video-call.component.css']
})
export class GroupAppVideoCallComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input() groupAppt: GroupApptModel;
  @Input() token: string;
  @Input() isProvider: boolean = true;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
   url: any = null;
  @ViewChild('callFrame') callFrame: ElementRef;
  participantClients: any;
  frame: any;
  constructor(private authService: AuthenticationService,
    private cdChanged: ChangeDetectorRef,
     private santize: DomSanitizer) {
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
    if (this.groupAppt && this.groupAppt.DailyRoomID && this.token) {
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
        url: `${Global.DailyCoUrl}/${this.groupAppt.DailyRoomID}`,
        lang: 'en'
      });

      this.frame.on("app-message", (event) => {
        console.log(event);
        if (event && event.data && event.data == "MIC_CAM") {
          this.frame.setLocalVideo(true);
          this.frame.setLocalAudio(true);
        }
      });

      this.frame.on('joined-meeting', (event) => {
        this.frame.setLocalVideo(true);
      });

      this.frame.on('participant-joined', (event) => {
      });

      this.frame.on('participant-updated', (event) => {
      });

      this.frame.on('participant-left', (event) => {
      });

      this.frame.on('left-meeting', (event) => {
        this.frame.leave();
        this.frame.destroy();
        this.onClosed.emit(true);
      });
    }
  }

}

