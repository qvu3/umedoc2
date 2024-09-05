import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../../base.component';
import { MessageConstant } from '../../constant/message.const';
import UserModel from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  public model: UserModel = new UserModel();
  editor: any;
  @ViewChild('childModal') public modal!: ModalDirective;
  @ViewChild('f') public form!: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;

  constructor(
    private service: UserService,
    public authService: AuthenticationService,
    private dialog: CommonDialogService) {
    super(authService);
    this.model = new UserModel();
  }

  override ngOnInit() {

  }

  save() {
    this.Submitting = true;
    this.service.ResetPasswordUser(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Reset Password', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Reset Password', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show(id: string) {
    this.model = new UserModel();
    this.model.Id = id;

    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
