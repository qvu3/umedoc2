import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Options } from 'ngx-bootstrap/positioning/models';
import { Select2OptionData } from 'ng-select2';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientStorageService } from 'src/app/modules/common/services/patient-storage.service';
import { PatientStorage } from 'src/app/modules/common/models/patient-storage.model';
import { ProviderStorageService } from 'src/app/modules/common/services/provider-storage.service';
import { ProviderStorage } from 'src/app/modules/common/models/provider-storage.model';

@Component({
  selector: 'app-share-link-modal',
  templateUrl: './share-link-modal.component.html',
  styleUrls: ['./share-link-modal.component.css']
})
export class ShareLinkModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  @Input() isProvider: boolean = false;
  model: any = {};
  constructor(public authService: AuthenticationService,
    private service: PatientStorageService,
    private providerStorageService: ProviderStorageService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit(): void {
  }

  save() {
    if (this.isProvider) {
      this.providerStorageService.ProviderStorageShareUrl(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert('Provider Storage', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.closeModal.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Storage', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Storage', error.error);
        });
    }
    else {
      this.service.PatientStorageShareUrl(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert('Patient Storage', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.closeModal.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Storage', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Storage', error.error);
        });
    }
  }

  show(patientID) {
    if (this.isProvider) {
      this.model = new ProviderStorage();
      this.model.ProviderID = patientID ? patientID : this.currentUser.Id;
    }
    else {
      this.model = new PatientStorage();
      this.model.PatientID = patientID ? patientID : this.currentUser.Id;
    }

    this.model.CompanyID = this.currentUser.CompanyID; 
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
