import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalDirective } from 'ngx-bootstrap';
import { OpentokService } from '../../services/open-tok.service';
import { AppointmentService } from '../../services/appointment.service';
import { CommonDialogService } from '../../services/dialog.service'; 

@Component({
  selector: 'app-open-tok',
  templateUrl: './open-tok.component.html',
  styleUrls: ['./open-tok.component.css'],
  providers: [OpentokService]
})
export class OpenTokComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @Input() sessionId: string;
  @Input() isDoctor: boolean;
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  @Output() onClosed:EventEmitter<boolean> = new EventEmitter();
  constructor(private ref: ChangeDetectorRef,
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,
    private opentokService: OpentokService) {
    super(authService);
    this.changeDetectorRef = ref;
  }

  ngOnInit() {

  }
  onErrorJoinRoom() {
    this.dialog.showSwalErrorAlert('Error', 'Please refresh Page and join again.');
  }

  getToken() {
    if (this.sessionId) {
      this.appointmentService.GenerateTokenPublisher(this.sessionId).subscribe(r => {
        this.initSession(r);
        this.modal.show();
      });
    }
  }

  initSession(config) {
    this.opentokService.initSession(config).then((session: OT.Session) => {
      this.session = session;
      this.changeDetectorRef.detectChanges();
      this.session.on('streamCreated', (event) => {
        //console.log('streamCreated');
        var indexStream = this.streams.findIndex(c => c.streamId == event.stream.streamId);
        if (indexStream < 0) {
          this.streams.push(event.stream);
          this.changeDetectorRef.detectChanges();
        }
      });

      this.session.on('streamDestroyed', (event) => {
        //console.log('streamDestroyed');
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });

    })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
      });
  }

  initSessionSubcriber(config) {
    this.opentokService.initSession(config)
      .then((session: OT.Session) => {
        this.session = session;
      })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
      });
  }

  publisherLeaveRoom() {
    this.session = null;
    this.streams = [];
    this.onClosed.emit(true);
    this.modal.hide();
  }

  show() {
    this.getToken();
  }

  hide() {  
    this.session = null;
    this.streams = [];
    this.onClosed.emit(true);
    this.modal.hide()
  }

}
