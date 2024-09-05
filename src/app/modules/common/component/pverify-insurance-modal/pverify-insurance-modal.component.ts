import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Global from '../../../../../app/Global';
import { BaseComponent } from '../../../base.component';
import { MessageConstant } from '../../constant/message.const';
import { PverifyPatientInsuranceModel } from '../../models/pverify-patient-insurance.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PayerService } from '../../services/payer.service';
import { PverifyPatientInsuranceService } from '../../services/pverify-patient-insurance.service';

@Component({
  selector: 'app-pverify-insurance-modal',
  templateUrl: './pverify-insurance-modal.component.html',
  styleUrls: ['./pverify-insurance-modal.component.css']
})
export class PverifyInsuranceModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal')
  public modal!: ModalDirective;
  @ViewChild('f') public form!: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PverifyPatientInsuranceModel = new PverifyPatientInsuranceModel();
  states: any;
  payers: Array<{ id: string, text: string }> = [];
  isUploading: boolean = false;
  IsMedicarePartAAndB: boolean = false;
  payersMedicarePartAAndB: Array<{ id: string, text: string }> = [];
  payerCodeMedicarePartAAndB: string = '';

  constructor(public authService: AuthenticationService,
              private service: PverifyPatientInsuranceService,
              private payerService: PayerService,
              private dialog: CommonDialogService) {
    super(authService);
  }

  override ngOnInit(): void {
    this.states = Global.US_StateList;
  }

  save() {
    this.service.Create(this.model).subscribe(result => {
      this.Submitting = false;
      this.dialog.showToastrSuccess('Add Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
      this.hide();
      this.onClosed.emit(true);
    },
    error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Add Insurance', error?.error ?? MessageConstant.FAILURE_REQUEST);
    });
  }

  getPayers() {
    this.payers = [];
    this.payerService.GetAll().subscribe(r => {
      this.payers = r.map(x => ({
        id: x.PayerCode,
        text: x.PayerName
      }));

      this.payersMedicarePartAAndB = this.payers.filter(c => c.text.toUpperCase() === 'Medicare Part A and B'.toUpperCase());
      this.payerCodeMedicarePartAAndB = this.payersMedicarePartAAndB.length > 0 ? this.payersMedicarePartAAndB[0].id : '';

      if (this.IsMedicarePartAAndB) {
        this.model.PayerCode = this.payerCodeMedicarePartAAndB;
      }
    });
  }

  show(insuranceType: string, patientId: string) {
    this.getPayers();
    this.model = new PverifyPatientInsuranceModel();
    this.model.IsSubscriberPatient = true;
    this.model.PatientID = patientId ?? this.currentUser.Id;
    this.model.InsuranceType = insuranceType;
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
