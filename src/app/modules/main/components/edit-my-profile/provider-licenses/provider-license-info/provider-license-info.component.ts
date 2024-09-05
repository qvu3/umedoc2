import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ApptCategoryModel } from 'src/app/modules/common/models/appt-category.model';
import { ProviderLicenseModel } from 'src/app/modules/common/models/provider-license.model';
import { ProviderServiceAssignmentModel } from 'src/app/modules/common/models/provider-service-assignment.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderLicenseService } from 'src/app/modules/common/services/provider-license.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-provider-license-info',
  templateUrl: './provider-license-info.component.html',
  styleUrls: ['./provider-license-info.component.css']
})
export class ProviderLicenseInfoComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: ProviderLicenseModel = new ProviderLicenseModel();
  licensedIns: any;
  isUploading: boolean = false;
  constructor(public authService: AuthenticationService,
    private service: ProviderLicenseService,
    private dialog: CommonDialogService) {
    super(authService);
    this.licensedIns = Global.US_StateList;
  }

  ngOnInit(): void {

  }

  save() {
    if (this.model.ID) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider License', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider License', "Occured error during execute your request.");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider License', error.error);
        });
    } else {
      this.service.Create(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider License', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Occured error during execute your request.");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', error.error);
        });
    }
  }

  show(id, providerID) {
    this.model = new ProviderLicenseModel();
    if (id) {
      this.getEntity(id);
    } else {
      this.model.ProviderID = providerID;
      this.modal.show();
    }
  }

  getEntity(id) {
    if (id) {
      this.service.Get(id).subscribe(result => {
        if (result) {
          this.model = result;
          this.modal.show();
        }
        else {
          this.dialog.showSwalErrorAlert('Provider License', "Occured error during execute your request.");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider License', error.error);
        });
    }
  }

  hide() {
    this.form.resetForm();
    // $(".pickadate-selectors").each(function (index, item) {
    //   (document.getElementById(item.id) as HTMLInputElement).value= "";
    // });

    this.modal.hide();
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(returnObject) {
    if (returnObject) {
      this.model.LicenseImageUrlView = returnObject.ImageName;
      this.model.LicenseImageUrl = returnObject.ImagePath;
    }
  }

  removeAttach() {
    this.model.LicenseImageUrl = null;
    this.model.LicenseImageUrlView = null;
  }
}
