import { Component, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OpentokService } from '../../../services/open-tok.service';
declare var $:any;
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  providers: [OpentokService]
})

export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv')
  publisherDiv!: ElementRef;
  @Input()
  session!: OT.Session;
  @Input()
  isDoctor!: boolean;
  publisher!: OT.Publisher;
  publishing: Boolean;
  heightWindow!: number;
  isAudioOn:boolean=true;
  isCameraOn:boolean=true;
  @Output() onLeaveRoom:EventEmitter<boolean> = new EventEmitter();
  @Output() onError:EventEmitter<boolean> = new EventEmitter();
  stream!: OT.Stream;
  constructor(private opentokService: OpentokService) {
    this.publishing = false; 
  }

  ngAfterViewInit() {
    this.heightWindow = ($(window).height()-100);
    const OT = this.opentokService.getOT();
    // var height = `${this.heightWindow}px`;
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: 'append',
      width: '100%',
      height: '12vw',
      name: 'Patient',
      resolution: '640x480',
      style: { audioLevelDisplayMode: "on" }
    });
    

    if (this.session) {
      if (this.session && this.session.connection && this.session.connection.connectionId) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
  }

  turnOnOffAudio(){
    this.isAudioOn =!this.isAudioOn;
    this.publisher.publishAudio(this.isAudioOn);
  }

  turnOnOffVideo(){
    this.isCameraOn =!this.isCameraOn;
    this.publisher.publishVideo(this.isCameraOn);
  }

  leaveRoom(){ 
    this.session && this.session.unpublish(this.publisher); 
    this.publisher.destroy();
    this.session.disconnect(); 
    this.onLeaveRoom.emit(true);
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        this.onError.emit(true);
      } else {
        this.publishing = true;
      }
    });
  }

}