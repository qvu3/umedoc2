import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { PartnerCompanyModel } from 'src/app/modules/common/models/partner-company.model';
import { PayerModel } from 'src/app/modules/common/models/payer.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PayerService } from 'src/app/modules/common/services/payer.service';

@Component({
  selector: 'app-add-pverify-payer-list-modal',
  templateUrl: './add-pverify-payer-list-modal.component.html',
  styleUrls: ['./add-pverify-payer-list-modal.component.css']
})
export class AddPverifyPayerListModalComponent extends BaseComponent implements OnInit {
  public model: PayerModel = new PayerModel();
  editor: any;
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  partnerCompanies: PartnerCompanyModel[] = [];
  us_statelist = Global.US_StateList;
  isUploading: boolean = false;
  constructor(
    private service: PayerService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService) {
    super(authService);
    this.model = new PayerModel();
  }

  ngOnInit() {
    
  }
 
  save() {
    this.Submitting = true;
    this.service.Edit(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Update PVerify Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Update PVerify Insurance', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show(id) {
    this.model = new PayerModel();
    this.getEntity(id);
    this.modal.show();
  }

  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}

