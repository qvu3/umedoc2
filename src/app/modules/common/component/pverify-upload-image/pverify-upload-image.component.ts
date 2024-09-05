import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from '../../constant/message.const';
import { PverifyPatientInsuranceModel } from '../../models/pverify-patient-insurance.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonDialogService } from '../../services/dialog.service';
import { PverifyPatientInsuranceService } from '../../services/pverify-patient-insurance.service';
@Component({
  selector: 'app-pverify-upload-image',
  templateUrl: './pverify-upload-image.component.html',
  styleUrls: ['./pverify-upload-image.component.css']
})
export class PverifyUploadImageComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: PverifyPatientInsuranceModel = new PverifyPatientInsuranceModel();
  isUploading: boolean = false;
  constructor(public authService: AuthenticationService,
    private service: PverifyPatientInsuranceService,
    private dialog: CommonDialogService) {
    super(authService);

  }

  ngOnInit(): void {
  }

  save() {
    this.service.Edit(this.model).subscribe(result => {
      this.Submitting = false;
      this.dialog.showToastrSuccess('Upload Image Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
      this.hide();
      this.onClosed.emit(true);
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Upload Image Insurance', error?.error ?? MessageConstant.FAILURE_REQUEST);
      });
  }



  show(id) {
    this.model = new PverifyPatientInsuranceModel();
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

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploadedBack(returnObject) {
    if (this.model.ID) {
      var imagePath = this.model.BackImageUrl;
      this.model.BackImageUrl = returnObject.ImagePath;
      this.model.BackImageUrlView = returnObject.ImageName;

      this.service.Edit(this.model).subscribe(result => {
        this.service.DeleteS3Image(imagePath).subscribe(response => {
          //this.dialog.showToastrWarning('Image has been removed!');
        });
      });
    } else {
      var imagePath = this.model.BackImageUrl;
      this.model.BackImageUrl = returnObject.ImagePath;
      this.model.BackImageUrlView = returnObject.ImageName;
      this.service.DeleteS3Image(imagePath).subscribe(response => {

      });
    }
  }

  uploadedFront(returnObject) {
    if (this.model.ID) {
      var imagePath = this.model.FrontImageUrl;
      this.model.FrontImageUrl = returnObject.ImagePath;
      this.model.FrontImageUrlView = returnObject.ImageName;

      this.service.Edit(this.model).subscribe(result => {
        this.service.DeleteS3Image(imagePath).subscribe(response => {
          //this.dialog.showToastrWarning('Image has been removed!');
        });
      });
    } else {
      var imagePath = this.model.FrontImageUrl;
      this.model.FrontImageUrl = returnObject.ImagePath;
      this.model.FrontImageUrlView = returnObject.ImageName;
      this.service.DeleteS3Image(imagePath).subscribe(response => { });
    }
  }

  removeAttachBack(event) {
    this.service.DeleteS3Image(event.BackImageUrl).subscribe(result => {
      if (result) {
        this.model.BackImageUrl = '';
        this.model.BackImageUrlView = '';
        this.service.Edit(this.model).subscribe(response => {
          this.dialog.showToastrWarning('Image has been removed!');
        });
      }
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }

  removeAttachFront(event) {
    this.service.DeleteS3Image(event.FrontImageUrl).subscribe(result => {
      if (result) {
        this.model.FrontImageUrl = '';
        this.model.FrontImageUrlView = '';
        this.service.Edit(this.model).subscribe(response => {
          this.dialog.showToastrWarning('Image has been removed!');
        });
      }
    },
      error => {
        this.Submitting = false;
        this.dialog.showSwalErrorAlert('Error', error.error);
      });
  }
}


