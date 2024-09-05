import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AppointmentDocumentModel } from './../../../../../common/models/appointment-document.model';
import { AppointmentDocumentService } from 'src/app/modules/common/services/appointment-document.service';
import { PrizmNoteSendModel } from './../../../../../common/models/prizm-note-send.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prizm-send-note-modal',
  templateUrl: './prizm-send-note-modal.component.html',
  styleUrls: ['./prizm-send-note-modal.component.css']
})
export class PrizmSendNoteModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PrizmNoteSendModel = new PrizmNoteSendModel();
  patientId: string = "";
  appointmentId: string = "";
  documents: AppointmentDocumentModel[] = [];
  constructor(public authService: AuthenticationService,
    private appointmentDocumentService: AppointmentDocumentService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {

  }

  getDocuments(appointmentId) {
    this.documents = [];
    this.appointmentDocumentService.GetByAppointmentId(appointmentId).subscribe(r => {
      this.documents = r;
    })
  }

  save() {
    if (!this.model?.AppointmentDocumentID) {
      this.dialog.showToastrError('Send Prizm Note', 'Please select document to send');
      return;
    }
    this.appointmentService.SendPrizmPatientNotes(this.model).subscribe(result => {
      if (result && result.status) {
        this.Submitting = false;
        this.dialog.showToastrSuccess('Send Prizm Note', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Send Prizm Note', result.message ?? MessageConstant.FAILURE_REQUEST);
      }
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Send Prizm Note', error.error);
      });
  }

  show(appointmentId, patientId) {
    if (appointmentId && patientId) {
      this.model.AppointmentID = appointmentId;
      this.model.PatientID = patientId;
      this.getDocuments(appointmentId);
      this.modal.show();
    }
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
    this.closeModal.emit(true);
  }

  viewDocument(id) {
    this.appointmentDocumentService.Download(id).subscribe(r => {
      if (r) {
        var url = this.convertDataToURL(r);
        window.open(url, '_blank', `width=1000,height=800,left=${(window.screen.width / 2) - 500},top=${(window.screen.height / 2) - 400}`);
      }
    });
  }
}

