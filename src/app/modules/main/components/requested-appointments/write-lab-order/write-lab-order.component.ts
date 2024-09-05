import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { SignatureDocumentTemplate } from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { WriteLabOrderModel } from 'src/app/modules/common/models/signature-document.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { DocumentTemplateService } from 'src/app/modules/common/services/document-template.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-write-lab-order',
  templateUrl: './write-lab-order.component.html',
  styleUrls: ['./write-lab-order.component.css'],
  providers: [DatePipe]
})
export class WriteLabOrderComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() OnClosedLabOrder: EventEmitter<any> = new EventEmitter();
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
    this.service.GetByTemplateName(SignatureDocumentTemplate.LabOrder, appointmentId).subscribe(r => {
      if (r) {
        this.model = new WriteLabOrderModel();
        this.model.Content = r.Content;
        this.model.AppointmentID = appointmentId;
        this.model.CompanyID = r.CompanyID;
        this.model.IsWriteLabOrder = true;
        this.modal.show();
      } else {
        this.model = new WriteLabOrderModel();
        this.model.AppointmentID = appointmentId;
        this.model.AppointmentID = this.currentUser.CompanyID;
        this.model.IsWriteLabOrder = true;
        this.modal.show();
      }
    });
  }


  signature() {

    if (this.model.LabOrderView && this.model.LabOrderView != this.model.LabOrder) {
      this.model.LabOrder = this.model.LabOrderView;
    }

    this.model.Content = this.model.Content.replace("[LABORDER]", this.model.LabOrder);
    this.model.Content = this.model.Content.replace("[ICD-CODES]", this.model.ICDCodes);

    if (this.model.OrderDate) {
      this.model.Content = this.model.Content.replace("[ORDERDATE]", this.datePipe.transform(this.model.OrderDate, 'MM/dd/yyyy'));
    } else {
      this.model.Content = this.model.Content.replace("[ORDERDATE]", "");
    }

    this.OnClosedLabOrder.emit(this.model);
    this.hide();
  }

  cancel() {
    this.hide();
  }

  onKeyDown(event) {
    //if (event.which === 13)
    //this.model.LabOrderView = this.model.LabOrder;
  }
}