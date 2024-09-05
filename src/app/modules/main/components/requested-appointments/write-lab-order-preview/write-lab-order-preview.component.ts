import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { WriteLabOrderModel } from 'src/app/modules/common/models/signature-document.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DocumentTemplateService } from 'src/app/modules/common/services/document-template.service';
import { PatientStorageService } from 'src/app/modules/common/services/patient-storage.service';

@Component({
  selector: 'app-write-lab-order-preview',
  templateUrl: './write-lab-order-preview.component.html',
  styleUrls: ['./write-lab-order-preview.component.css']
})
export class WriteLabOrderPreviewComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  isSubmitted: boolean = false;
  model: WriteLabOrderModel = new WriteLabOrderModel();
  constructor(
    private service: PatientStorageService,
    authService: AuthenticationService,
    private dialog: CommonDialogService,) {
    super(authService);
  }

  ngOnInit(): void {
  }

  hide() {
    this.model = new WriteLabOrderModel();
    this.modal.hide();
  }

  show() {
    this.modal.show();
  }

  generatePDF() {
    this.isSubmitted = true;
    this.service.SaveLabOrderPDF(this.model).subscribe(r => {
      if (r) {
        this.isSubmitted = false;
        if (this.model.IsWriteLabOrder) {
          this.dialog.showToastrSuccess('Lab Order', "Lab Order has been added to Patient's Medical Document Storage.");
        } else {
          this.dialog.showToastrSuccess('Referral', "Referral has been added to Patient's Medical Document Storage.");

        }
        this.authenticationService.onReloadWriteDocumentReferral.emit(true);
        this.hide();
      }
      else {
        this.isSubmitted = false;
        this.dialog.showSwalErrorAlert(this.model.IsWriteLabOrder ? 'Lab Order' : 'Referral', MessageConstant.FAILURE_REQUEST);
      }
    },
      error => {
        this.isSubmitted = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }
}
