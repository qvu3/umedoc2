import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';

@Component({
  selector: 'app-cancel-reason-modal',
  templateUrl: './cancel-reason-modal.component.html',
  styleUrls: ['./cancel-reason-modal.component.css']
})
export class CancelReasonModalComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onSaved: EventEmitter<AppointmentModel> = new EventEmitter();
  @Output() onCanceled: EventEmitter<boolean> = new EventEmitter();
  content: string;
  isNoShow: boolean = false;
  appt: AppointmentModel = new AppointmentModel();
  id:string;
  isCancelCompletedAppt: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  save() { 
    this.appt.CancelReason = this.content;
    this.appt.IsNoShow = this.isNoShow;
    this.appt.IsCancelCompletedAppt = this.isCancelCompletedAppt;
    this.onSaved.emit(this.appt);
    this.form.resetForm();
    this.modal.hide();
  }

  hide() {
    this.onCanceled.emit(true);
    this.form.resetForm();
    this.modal.hide();
  }

  show(id) {
    this.appt.ID = id;
    this.modal.show();
  }

}
