import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import UserModel from 'src/app/modules/common/models/user.model';
import { ModalDirective } from 'ngx-bootstrap'; 
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/modules/common/services/user.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
 

@Component({
  selector: 'app-resend-sms-register',
  templateUrl: './resend-sms-register.component.html',
  styleUrls: ['./resend-sms-register.component.css']
})
export class ResendSmsRegisterComponent extends BaseComponent implements OnInit {
  public model: UserModel = new UserModel();
  editor: any;
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;

  constructor(
    private service: UserService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService) {
    super(authService);
    this.model = new UserModel();
  }

  ngOnInit() {

  }

  save() {
    this.Submitting = true;
    this.service.ResendSMSVerify(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Resend SMS Verify', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Resend SMS Verifyd', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show(userId) {
    this.model = new UserModel();  
    this.model.Id = userId;
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}

