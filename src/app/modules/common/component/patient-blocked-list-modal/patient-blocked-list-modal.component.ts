import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../../../modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PatientProfileService } from '../../services/patient-profile.service';

@Component({
  selector: 'app-patient-blocked-list-modal',
  templateUrl: './patient-blocked-list-modal.component.html',
  styleUrls: ['./patient-blocked-list-modal.component.css']
})
export class PatientBlockedListModalComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel = new PatientProfileModel();
  @ViewChild('childModal') public modal!: ModalDirective;
  @ViewChild('f') public form!: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  constructor(public override authenticationService: AuthenticationService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService) {
    super(authenticationService);
  }

  override ngOnInit(): void {
  }

  show(id: any) {
    this.getEntity(id);
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  getEntity(id: string) {
    this.patientProfileService.GetPatientForBlockedList(id).subscribe(r => {
      if (r) {
        this.model = r;
      } else {
        this.dialog.showSwalErrorAlert("Patient Block List", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Patient Block List", message);
    });
  }

  save() {
    this.patientProfileService.Update(this.model).subscribe(c => {
      if (c) {
        this.dialog.showToastrSuccess("Patient Block List", MessageConstant.REQUEST_SUCCESS_CONST);
        this.closeModal.emit(true);
        this.hide();
      } else {
        this.dialog.showSwalErrorAlert("Patient Block List", MessageConstant.FAILURE_REQUEST);
      }
    }, error => {
      let message = error?.error ?? MessageConstant.FAILURE_REQUEST;
      this.dialog.showSwalErrorAlert("Patient Block List", message);
    });
  }
}
