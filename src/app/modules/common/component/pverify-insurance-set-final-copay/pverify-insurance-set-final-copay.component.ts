import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { PverifyPatientInsuranceModel } from '../../models/pverify-patient-insurance.model';

@Component({
  selector: 'app-pverify-insurance-set-final-copay',
  templateUrl: './pverify-insurance-set-final-copay.component.html',
  styleUrls: ['./pverify-insurance-set-final-copay.component.css']
})
export class PverifyInsuranceSetFinalCopayComponent implements OnInit {
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
    this.model.FinalCopay = null;
    this.modal.show();
  }

}

