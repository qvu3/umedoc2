import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { DocumentTemplateService } from 'src/app/modules/common/services/document-template.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import SignatureDocumentModel from 'src/app/modules/common/models/signature-document.model';
import { PatientStorageService } from 'src/app/modules/common/services/patient-storage.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';

@Component({
  selector: 'app-signature-patient',
  templateUrl: './signature-patient.component.html',
  styleUrls: ['./signature-patient.component.css']
})
export class SignaturePatientComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() OnSaved: EventEmitter<any> = new EventEmitter();
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureValue: string;
  model: SignatureDocumentModel = new SignatureDocumentModel();
  constructor(
    private dialog: CommonDialogService,
    private service: PatientStorageService,
    public authenticationService: AuthenticationService
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
    this.signaturePad.clear();
  }

  show() {
    this.signatureValue = '';
    this.signaturePad.clear();
    this.modal.show();
  }


  save() {
    if (!this.model.Content.toUpperCase().includes("[SIGNATURE]")) {
      this.dialog.showSwalErrorAlert('Signature', "[SIGNATURE] in document is required.");
      return;
    }

    this.service.SaveWorkReleasePDF(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess('Signature', MessageConstant.REQUEST_SUCCESS_CONST);
        this.OnSaved.emit(true);
        this.hide();
      }
      else {
        this.dialog.showSwalErrorAlert('Signature', MessageConstant.FAILURE_REQUEST);
      }
    },
      error => {
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }

  cancel() {
    this.form.resetForm();
    this.modal.hide();
    this.signaturePad.clear();
  }

  clearSignature() {
    this.signatureValue = '';
    this.signaturePad.clear();
  }

  signaturePadOptions: Object = {
    'minWidth': 2.5,
    'maxWidth': 3.5,
    'canvasWidth': 450,
    'canvasHeight': 150
  };

  drawComplete() {
    this.signatureValue = this.signaturePad.toDataURL();
    this.model.SignatureContent = this.signaturePad.toDataURL();
  }
}