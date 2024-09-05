import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../../services/open-tok.service';
declare var $:any;
@Component({
  selector: 'app-subscriber',
  templateUrl: './subcriber.component.html',
  styleUrls: ['./subcriber.component.css'],
  providers: [OpentokService]
})

export class SubscriberComponent implements AfterViewInit, OnDestroy {
  @ViewChild('subscriberDiv')
  subscriberDiv!: ElementRef;
  @Input()
  isDoctor!: boolean;
  @Input()
  session!: OT.Session;
  @Input()
  stream!: OT.Stream;
  subscriber: OT.Subscriber | null = null;
  isCameraOn: boolean = true;
  isAudioOn: boolean = true;
  isForceOffCamera: boolean = false;
  isForceOffAudio: boolean = false;
  @Input()
  totalStream!: number;
  checkAudioTimer: any;
  constructor() { }

  ngAfterViewInit() {
    var heightSubcriber = ($(window).height() - 100) / this.totalStream;

    this.isCameraOn = this.stream && this.stream.hasVideo;
    this.isAudioOn = this.stream && this.stream.hasAudio;
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {
      insertMode: 'append',
      width:  '100%',
      height: heightSubcriber,
      preferredResolution: {width:1280,height:720},
      showControls: false,
    }, (err) => {
      if (err) {
        alert(err.message);
      }
    });
    if (this.subscriber) {
      this.checkAudioTimer = setInterval(() => { 
        this.isForceOffAudio = !this.stream.hasAudio;
      }, 200);

      this.subscriber.on({
        audioBlocked: (event: any) => {
          this.isAudioOn = false;
          this.isForceOffAudio = true;
        },
        audioUnblocked: (event: any) => {
          this.isAudioOn = true;
          this.isForceOffAudio = false;
        }
      });

      this.subscriber.on({
        videoDisabled: (event: any) => {
          this.isCameraOn = false;
          this.isForceOffCamera = true;
        },
        videoEnabled: (event: any) => {
          this.isCameraOn = true;
          this.isForceOffCamera = false;
        }
      });
    }
  }

  turnOnOffVideo() {
    this.isCameraOn = !this.isCameraOn;
    if (this.subscriber) {
      this.subscriber.subscribeToVideo(this.isCameraOn);
    }
  }

  turnOnOffAudio() {
    this.isAudioOn = !this.isAudioOn;
    if (this.subscriber) {
      this.subscriber.subscribeToAudio(this.isAudioOn);
    }
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.session.unsubscribe(this.subscriber);
      clearInterval(this.checkAudioTimer);
      this.subscriber.off('audioBlocked');
      this.subscriber.off('audioUnblocked');
      this.subscriber.off('videoDisabled');
      this.subscriber.off('videoEnabled');
      this.subscriber =null;
    }
  }
}