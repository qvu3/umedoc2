import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { WriteLabOrderModel } from 'src/app/modules/common/models/signature-document.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientStorageService } from 'src/app/modules/common/services/patient-storage.service';

@Component({
  selector: 'app-signature-provider',
  templateUrl: './signature-provider.component.html',
  styleUrls: ['./signature-provider.component.css']
})
export class SignatureProviderComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  @Output() OnSaved: EventEmitter<any> = new EventEmitter();
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureValue: string;
  model: WriteLabOrderModel = new WriteLabOrderModel();
  constructor(
    private dialog: CommonDialogService,
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
    this.model.Content = this.model.Content.replace('[SIGNATURE]', this.model.SignatureContent);
    this.OnSaved.emit(this.model);
    this.form.resetForm();
    this.modal.hide();
    this.signaturePad.clear();
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
