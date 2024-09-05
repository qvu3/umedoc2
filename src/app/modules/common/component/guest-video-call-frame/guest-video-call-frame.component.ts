import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import DailyIframe from '@daily-co/daily-js';
import { SimpleChanges } from '@angular/core';
import { AppointmentModel } from '../../models/appointment.model';
import Global from '../../../../Global';

@Component({
  selector: 'app-guest-video-call-frame',
  templateUrl: './guest-video-call-frame.component.html',
  styleUrls: ['./guest-video-call-frame.component.css']
})
export class GuestVideoCallFrameComponent implements AfterViewInit, OnChanges {
  @Input()
  appointment: AppointmentModel = new AppointmentModel;
  @Input()
  token!: string;
  @Input() isJoinCallVideo: boolean = false;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  url: any = null;
  @ViewChild('callFrame')
  callFrame!: ElementRef;
  constructor(
    private cdChanged: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngAfterViewInit(): void {
    this.joinMeeting();
  }

  ngOnChanges(params: SimpleChanges) {

  }

  joinMeeting() {
    if (this.appointment && this.appointment.RoomName && this.isJoinCallVideo) {
      let frame = DailyIframe.createFrame(this.callFrame.nativeElement, {
        showLeaveButton: true,
        showFullscreenButton: true,
        //userName: this.appointment.PatientName,
        iframeStyle: {
          width: '100%',
          height: `85vh`
        }
      });

      frame.join({
        //token: this.token,
        url: `${Global.DailyCoUrl}/${this.appointment.RoomName}`,

        lang: 'en'
      });

      frame.on('left-meeting', (event) => {
        frame.leave();
        frame.destroy();
        this.onClosed.emit(true);
      });
    }
  }
}

