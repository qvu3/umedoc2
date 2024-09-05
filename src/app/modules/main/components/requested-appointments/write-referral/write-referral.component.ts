import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { SignatureDocumentTemplate } from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { WriteLabOrderModel } from 'src/app/modules/common/models/signature-document.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { DocumentTemplateService } from 'src/app/modules/common/services/document-template.service';

@Component({
  selector: 'app-write-referral',
  templateUrl: './write-referral.component.html',
  styleUrls: ['./write-referral.component.css'],
  providers:[DatePipe]
})
export class WriteReferralComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() OnClosedReferral: EventEmitter<any> = new EventEmitter();
  model: WriteLabOrderModel = new WriteLabOrderModel();
  constructor(private service: DocumentTemplateService,
    private datePipe: DatePipe,
    authenticate: AuthenticationService) {
    super(authenticate);
  }

  ngOnInit(): void {
  }

  hide() {
    this.model = new WriteLabOrderModel();
    this.form.resetForm();
    this.modal.hide();
  }

  show(appointmentId) {
    this.getTemplateLabOrderDocument(appointmentId);
  }

  getTemplateLabOrderDocument(appointmentId) {
    this.service.GetByTemplateName(SignatureDocumentTemplate.Referral, appointmentId).subscribe(r => {
      if (r) {
        this.model = new WriteLabOrderModel();
        this.model.Content = r.Content;
        this.model.AppointmentID = appointmentId;
        this.model.CompanyID = r.CompanyID;
        this.model.IsWriteLabOrder = false;
        this.modal.show();
      } else {
        this.model = new WriteLabOrderModel();
        this.model.AppointmentID = appointmentId;
        this.model.AppointmentID = this.currentUser.CompanyID;
        this.model.IsWriteLabOrder = false;
        this.modal.show();
      }
    });
  }


  signature() {

    if (this.model.LabOrderView && this.model.LabOrderView != this.model.LabOrder) {
      this.model.LabOrder = this.model.LabOrderView;
    }

    this.model.Content = this.model.Content.replace("[REFERRALTO]", this.model.LabOrder);
    this.model.Content = this.model.Content.replace("[ICD-CODES]", this.model.ICDCodes);

    if (this.model.OrderDate) {
      this.model.Content = this.model.Content.replace("[ORDERDATE]", this.datePipe.transform(this.model.OrderDate, 'MM/dd/yyyy'));
    } else {
      this.model.Content = this.model.Content.replace("[ORDERDATE]", "");
    }

    this.OnClosedReferral.emit(this.model);
    this.hide();
  }

  cancel() {
    this.hide();
  }

  onKeyDown(event) { 
  }
}