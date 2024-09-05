import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import UserModel from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { MessageConstant } from '../../constant/message.const';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
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
    this.service.ChangePasswordUser(this.model).subscribe(result => {
      if (result) {
        this.Submitting = false;
        this.dialog.showSwalSuccesAlert('Change Password', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.closeModal.emit(true);
      }
      else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Change Password', MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Error', error.error);
    });
  }

  show(id) {
    this.model = new UserModel();
    this.model.Id = id;

    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
