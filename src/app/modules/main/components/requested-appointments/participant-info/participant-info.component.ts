import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { ParticipantModel } from 'src/app/modules/common/models/participant.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';

@Component({
  selector: 'app-participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onRefreshParticipantClient: EventEmitter<boolean> = new EventEmitter();
  @Output() onTurnCamMic: EventEmitter<boolean> = new EventEmitter();
  roomName: string;
  participants: string;
  participantClients: string;
  constructor(private service: AppointmentService) { }

  ngOnInit(): void {
  }

  turnOnMicCamera() {
    this.onTurnCamMic.emit(true);
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  show(roomName) {
    if (roomName) {
      this.roomName = roomName;
      this.participants = "";
      this.getParticipants();
      this.modal.show();
    }
  }

  refreshParticipants() {
    // Get data from java scripts
    this.onRefreshParticipantClient.emit(true);

    // Get data for API
    this.getParticipants();
  }

  getParticipants() {
    this.service.getParticipants(this.roomName).subscribe(r => {
      if (r) {
        this.participants = JSON.stringify(r);
      }
    });
  }

  cancel() {
    this.modal.hide();
  }
}
