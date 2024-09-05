import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { DocumentTemplateService } from 'src/app/modules/common/services/document-template.service';
import { DocumentTemplateModel } from 'src/app/modules/common/models/document-template.model';
import { SignaturePatientComponent } from '../signature-patient/signature-patient.component';
import SignatureDocumentModel from 'src/app/modules/common/models/signature-document.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';
import Global, { SignatureDocumentTemplate } from 'src/app/Global';

@Component({
  selector: 'app-write-work-release',
  templateUrl: './write-work-release.component.html',
  styleUrls: ['./write-work-release.component.css']
})
export class WriteWorkReleaseComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  model: SignatureDocumentModel = new SignatureDocumentModel();
  @ViewChild('signatureModal') signatureModal: SignaturePatientComponent;
  constructor(private service: DocumentTemplateService,
    authenticate: AuthenticationService) {
    super(authenticate);
  }

  ngOnInit(): void {
  }

  hide() {
    this.model = new SignatureDocumentModel();
    this.form.resetForm();
    this.modal.hide();
  }

  show(appointmentId) {
    this.getTemplateDocument(appointmentId);
  }

  getTemplateDocument(appointmentId) {
    this.service.GetByTemplateName(SignatureDocumentTemplate.WorkRelease, appointmentId).subscribe(r => {
      if (r) {
        this.model = r;
        this.modal.show();
      } else {
        this.model = new SignatureDocumentModel();
        this.modal.show();
      }
    });
  }

  signature() {
    this.signatureModal.model = this.model;
    this.signatureModal.show();
  }

  cancel() {
    this.model = new SignatureDocumentModel();
    this.modal.hide();
  }

  onSaved(event) {
    if (event) {
      this.hide();
    }
  }
}