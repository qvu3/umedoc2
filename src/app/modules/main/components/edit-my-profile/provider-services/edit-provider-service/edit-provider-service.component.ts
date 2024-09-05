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
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

@Component({
  selector: 'app-edit-provider-service',
  templateUrl: './edit-provider-service.component.html',
  styleUrls: ['./edit-provider-service.component.css']
})
export class EditProviderServiceComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter();
  Submitting: boolean = false;
  model: ProviderServiceAssignmentModel = new ProviderServiceAssignmentModel();
  categoryList: ApptCategoryModel[] = [];
  licenses:ProviderLicenseModel[]=[];

  constructor(public authService: AuthenticationService,
    private service: ProviderProfileService, 
    private dialog: CommonDialogService) {
    super(authService);

  }

  ngOnInit(): void {

  }


  save() {
    if (this.model.ID) {
      this.service.UpdateProviderService(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Service', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        });
    } else {
      this.service.AddProviderService(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showToastrSuccess('Provider Service', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.onClosed.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Provider Service', "Your Service Existed");
        });
    }
  }

  getProviderLicenseState(providerId){
    this.licenses = [];
    this.service.GetProviderLicenses(providerId).subscribe(r=>{
      this.licenses = r;
    });
  }

  show(id, providerId) {
    this.getCategories();
    this.model = new ProviderServiceAssignmentModel();
    this.model.CompanyID = Global.CompnayID;
    this.model.ProviderID = providerId ?? this.currentUser.Id;

    this.getProviderLicenseState(this.model.ProviderID);
    if (id) {
      this.model.ID = id;
      this.getEntity();
    }

    this.modal.show();
  }

  getEntity() {
    this.service.GetProviderService(this.model.ID).subscribe(result => {
      if (result) {
        this.model = result;
      }
    });
  }

  getCategories() {
    this.categoryList = [];
    this.service.GetApptCategories().subscribe(r => {
      this.categoryList = r ?? [];
    });
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }
}
