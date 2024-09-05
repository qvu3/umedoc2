import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UserService } from 'src/app/modules/common/services/user.service';

@Component({
  selector: 'app-patient-invite-modal',
  templateUrl: './patient-invite-modal.component.html',
  styleUrls: ['./patient-invite-modal.component.css']
})
export class PatientInviteModalComponent extends BaseComponent implements OnInit {
  model: UserModel = new UserModel();
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;

  constructor(public authService: AuthenticationService,
    private userService: UserService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit() {

  }

  sendInvite() {
    this.Submitting = true;
    this.userService.InviteUser(this.model).subscribe(r => {
      if (r) {
        this.Submitting = false;
        this.dialog.showToastrSuccess("Invite User", "Your request was executed successfully.");
        this.hide();
      } else {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert("Invite User", "Oops! Occurred error during execute your request, please try again.");
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert("Invite User", error.error);
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
