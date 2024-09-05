import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { ModalDirective } from 'ngx-bootstrap';
import { Options } from 'ngx-bootstrap/positioning/models';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
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
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PverifyPatientInsuranceModel = new PverifyPatientInsuranceModel();
  states: any;
  optionsInsurance: Options;
  payers: Array<Select2OptionData>;
  isUploading: boolean = false;
  IsMedicarePartAAndB: boolean = false;
  payersMedicarePartAAndB: Array<Select2OptionData>;
  payerCodeMedicarePartAAndB: string = '';
  constructor(public authService: AuthenticationService,
    private service: PverifyPatientInsuranceService,
    private payerService: PayerService,
    private dialog: CommonDialogService) {
    super(authService);

  }

  ngOnInit(): void {
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
      var list = r.map(x => {
        return { id: x.PayerCode, text: x.PayerName } as Select2OptionData;
      });
      if (list) {
        this.payers = list;
        this.payersMedicarePartAAndB = this.payers.filter(c => c.text.toUpperCase() == 'Medicare Part A and B'.toUpperCase());
        this.payerCodeMedicarePartAAndB = this.payersMedicarePartAAndB ? this.payersMedicarePartAAndB[0].id : '';
        if (this.IsMedicarePartAAndB) {
          this.model.PayerCode = this.payerCodeMedicarePartAAndB;
        }
      }
    });
  }

  show(insuranceType, patientId) {
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



  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploadedBack(returnObject) {
    if (this.model.ID) {
      var imagePath = this.model.BackImageUrl;
      this.model.BackImageUrl = returnObject.ImagePath;
      this.model.BackImageUrlView = returnObject.ImageName;

      this.service.Edit(this.model).subscribe(result => {
        this.service.DeleteS3Image(imagePath).subscribe(response => {
          //this.dialog.showToastrWarning('Image has been removed!');
        });
      });
    } else {
      var imagePath = this.model.BackImageUrl;
      this.model.BackImageUrl = returnObject.ImagePath;
      this.model.BackImageUrlView = returnObject.ImageName;
      this.service.DeleteS3Image(imagePath).subscribe(response => {

      });
    }
  }

  uploadedFront(returnObject) {
    if (this.model.ID) {
      var imagePath = this.model.FrontImageUrl;
      this.model.FrontImageUrl = returnObject.ImagePath;
      this.model.FrontImageUrlView = returnObject.ImageName;

      this.service.Edit(this.model).subscribe(result => {
        this.service.DeleteS3Image(imagePath).subscribe(response => {
          //this.dialog.showToastrWarning('Image has been removed!');
        });
      });
    } else {
      var imagePath = this.model.FrontImageUrl;
      this.model.FrontImageUrl = returnObject.ImagePath;
      this.model.FrontImageUrlView = returnObject.ImageName;
      this.service.DeleteS3Image(imagePath).subscribe(response => { });
    }
  }

  removeAttachBack(event) {
    this.service.DeleteS3Image(event.BackImageUrl).subscribe(result => {
      if (result) {
        this.model.BackImageUrl = '';
        this.model.BackImageUrlView = '';
        this.service.Edit(this.model).subscribe(response => {
          this.dialog.showToastrWarning('Image has been removed!');
        });
      }
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }

  removeAttachFront(event) {
    this.service.DeleteS3Image(event.FrontImageUrl).subscribe(result => {
      if (result) {
        this.model.FrontImageUrl = '';
        this.model.FrontImageUrlView = '';
        this.service.Edit(this.model).subscribe(response => {
          this.dialog.showToastrWarning('Image has been removed!');
        });
      }
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }
}


