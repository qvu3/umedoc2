import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-patient-cancel-appointment-modal',
  templateUrl: './patient-cancel-appointment-modal.component.html',
  styleUrls: ['./patient-cancel-appointment-modal.component.css']
})
export class PatientCancelAppointmentModalComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onSaved: EventEmitter<any> = new EventEmitter();
  content: string;
  id: string;
  constructor() { }

  ngOnInit(): void {

  }

  save() {
    this.onSaved.emit({ id: this.id, text: this.content });
    this.form.resetForm();
    this.modal.hide();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  show(id) {
    this.id = id;
    this.modal.show();
  }

}
