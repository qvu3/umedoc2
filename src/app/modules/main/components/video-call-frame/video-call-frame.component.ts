import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import DailyIframe from '@daily-co/daily-js';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import Global from 'src/app/Global';

@Component({
  selector: 'app-video-call-frame',
  templateUrl: './video-call-frame.component.html',
  styleUrls: ['./video-call-frame.component.css']
})
export class VideoCallFrameComponent extends BaseComponent implements AfterViewInit, OnChanges {
  @Input() appointment: AppointmentModel;
  @Input() token: string;
  url: any = null;
  @ViewChild('callFrame') callFrame: ElementRef;
  constructor(private authService: AuthenticationService,
    private cdChanged: ChangeDetectorRef,
    private santize: DomSanitizer,
    private appointmentService: AppointmentService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.joinMeeting();
  }

  ngOnChanges(params: SimpleChanges) {

  }

  joinMeeting() {
    if (this.appointment && this.appointment.RoomName && this.token) {
      let frame = DailyIframe.createFrame(this.callFrame.nativeElement, {
        showLeaveButton: true,
        showFullscreenButton: true,
        iframeStyle: {
          width: '100%',
          height: `570px`
        }
      });

      frame.join({
        token: this.token,
        url: `${Global.DailyCoUrl}/${this.appointment.RoomName}`,
        lang: 'en'
      });

      frame.on('left-meeting', (event) => {
        window.close();
      });
    }
  }

}
