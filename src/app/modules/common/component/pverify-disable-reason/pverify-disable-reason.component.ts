import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { PverifyPatientInsuranceModel } from '../../models/pverify-patient-insurance.model';

@Component({
  selector: 'app-pverify-disable-reason',
  templateUrl: './pverify-disable-reason.component.html',
  styleUrls: ['./pverify-disable-reason.component.css']
})
export class PverifyDisableReasonComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() onSaved: EventEmitter<PverifyPatientInsuranceModel> = new EventEmitter();
  @Output() onCanceled: EventEmitter<boolean> = new EventEmitter();
  model: PverifyPatientInsuranceModel = new PverifyPatientInsuranceModel(); 
  constructor() { }

  ngOnInit(): void {

  }

  save() {  
    this.onSaved.emit(this.model);
    this.form.resetForm();
    this.modal.hide();
  }

  hide() {
    this.onCanceled.emit(true);
    this.form.resetForm();
    this.modal.hide();
  }

  show(entity) {
    this.model = entity;
    this.model.DeclineReason = '';
    this.modal.show();
  }

}

