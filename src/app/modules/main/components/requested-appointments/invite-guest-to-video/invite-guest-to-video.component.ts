import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { InviteGuestToVideoModel } from 'src/app/modules/common/models/signature-document.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-invite-guest-to-video',
  templateUrl: './invite-guest-to-video.component.html',
  styleUrls: ['./invite-guest-to-video.component.css']
})
export class InviteGuestToVideoComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  model: InviteGuestToVideoModel = new InviteGuestToVideoModel();
  constructor(private service: AppointmentService,
    private dialog: CommonDialogService,
    authenticate: AuthenticationService) {
    super(authenticate);
  }

  ngOnInit(): void {
  }

  hide() {
    this.model = new InviteGuestToVideoModel();
    this.form.resetForm();
    this.modal.hide();
  }

  show(appointmentID) {
    this.model.AppointmentID = appointmentID;
    this.modal.show();
  }

  cancel() {
    this.model = new InviteGuestToVideoModel();
    this.modal.hide();
  }

  save() {
    if (!this.model.Email && !this.model.CellPhone) {
      return;
    }

    this.service.InviteGuestToVideoSession(this.model).subscribe(r => {
      if (r) {
        this.dialog.showToastrSuccess('Invite Guest To Video', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
      }
      else {
        this.dialog.showSwalErrorAlert('Invite Guest To Video', MessageConstant.FAILURE_REQUEST);
      }
    },
      error => {
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }
}