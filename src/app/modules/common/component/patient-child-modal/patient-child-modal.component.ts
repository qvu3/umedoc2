import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../../../modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { PatientProfileModel } from '../../models/patient-profile.model';
import UserModel from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PatientProfileService } from '../../services/patient-profile.service';

@Component({
  selector: 'app-patient-child-modal',
  templateUrl: './patient-child-modal.component.html',
  styleUrls: ['./patient-child-modal.component.css']
})
export class PatientChildModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal')
  public modal!: ModalDirective;
  @ViewChild('f') public form!: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PatientProfileModel = new PatientProfileModel();
  constructor(public authService: AuthenticationService,
    private service: PatientProfileService,
    private dialog: CommonDialogService) {
    super(authService);

  }

  override ngOnInit(): void {
  }

  save() {
    if (!this.model.ID) {
      this.service.CreateChild(this.model).subscribe(result => {
        this.Submitting = false;
        this.dialog.showToastrSuccess('Add Child', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.onClosed.emit(true);
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Add Child', error?.error ?? MessageConstant.FAILURE_REQUEST);
        });
    } else {
      this.service.UpdateChildInfo(this.model.PatientUser).subscribe(result => {
        this.Submitting = false;
        this.dialog.showToastrSuccess('Edit Child', MessageConstant.REQUEST_SUCCESS_CONST);
        this.hide();
        this.onClosed.emit(true);
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Edit Child', error?.error ?? MessageConstant.FAILURE_REQUEST);
        });
    }
  }

  getEntity(id: string) {
    this.service.GetPatientProfileById(id).subscribe(r => {
      this.model = r;
      this.modal.show();
    })
  }


  show(id: string, parentId: string | null) {
    this.model = new PatientProfileModel();
    if (id) {
      this.getEntity(id);
    }
    else { 
      this.model.PatientUser= new UserModel();
      this.model.PatientUser.ParentUserID = parentId as string;
      this.modal.show();
    }
  }


  hide() {
    this.form.resetForm();
    this.modal.hide();
  }


     
}


