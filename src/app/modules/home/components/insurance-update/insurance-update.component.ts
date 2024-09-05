import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Options } from 'ngx-bootstrap/positioning/models';
import { Select2OptionData } from 'ng-select2';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { RoleConstants } from 'src/app/Global';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';

@Component({
  selector: 'app-insurance-update',
  templateUrl: './insurance-update.component.html',
  styleUrls: ['./insurance-update.component.css']
})
export class InsuranceUpdateComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('f') public form: NgForm;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() IsMedicalInsurance: boolean = false;
  Submitting: boolean = false;
  model: PatientInsuranceModel = new PatientInsuranceModel();
  isUploading: boolean = false;
  optionsInsurance: Options;
  InsuranceData: Array<Select2OptionData>;
  constructor(public authService: AuthenticationService,
    private service: PatientInsuranceService,
    private dialog: CommonDialogService, private utilityService: UtilityService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService) {
    super(authService);
  }

  ngOnInit(): void {
    this.getInsuranceList();
  }

  getInsuranceList() {
    this.InsuranceData = new Array<Select2OptionData>();
    this.utilityService.GetInsuranceList().subscribe(r => {
      if (r) {
        var list = r.map(x => {
          return { id: x.InsuranceName, text: x.InsuranceName } as Select2OptionData;
        });
        if (list) {
          this.InsuranceData = list;
        }
      }
    });
  }

  save() {

    // Check valid
    if (!this.model.InsuranceName
      || this.model.InsuranceName == ''
      || this.model.DontKnowCopay === undefined
      || this.model.DontKnowCopay === null)
      return;

    // Check valid insurance name
    // if (this.currentUser.Role == RoleConstants.Patient
    //   && this.model.InsuranceName
    //   && this.model.InsuranceName.trim() != ''
    //   && (this.model.InsuranceName.toLowerCase() == 'sunshine health'
    //     || this.model.InsuranceName.toLowerCase() == 'staywell'
    //     || this.model.InsuranceName.toLowerCase() == 'wellcare')) {
    //   this.dialog.showSwalErrorAlert('Patient Insurance', "This insurance needs to be added or updated by our agent. Please call/text us at 239-800-0448 or email help@umedoc.com");
    //   return;
    // }

    // Save data
    this.Submitting = true;
    if (this.model.ID) {
      this.service.Edit(this.model).subscribe(result => {
        if (result) {
          this.Submitting = false;
          this.dialog.showSwalSuccesAlert('Patient Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
          this.hide();
          this.closeModal.emit(true);
        }
        else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Insurance', MessageConstant.FAILURE_REQUEST);
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Insurance', error.error);
        });
    } else {

      this.pverifyPatientInsuranceService.CheckLimitAddingInsurance(this.model.PatientID, this.model.InsuranceName).subscribe(r => {
        if (!r) {
          this.service.Create(this.model).subscribe(result => {
            if (result) {
              this.Submitting = false;
              this.dialog.showSwalSuccesAlert('Patient Insurance', MessageConstant.REQUEST_SUCCESS_CONST);
              this.hide();
              this.closeModal.emit(true);
            }
            else {
              this.Submitting = false;
              this.dialog.showSwalErrorAlert('Patient Insurance', MessageConstant.FAILURE_REQUEST);
            }
          },
            error => {
              this.Submitting = false;
              this.dialog.showSwalErrorAlert('Patient Insurance', error.error);
            });
        } else {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Patient Insurance', MessageConstant.FAILURE_REQUEST);
        }
      });
    }
  }

  show(profile) {
    if (profile.ID) {
      this.service.Get(profile.ID).subscribe(result => {
        if (result) {
          this.model = result;
          this.modal.show();
        }
      },
        error => {
          this.Submitting = false;
          this.dialog.showSwalErrorAlert('Error', error.error);
        });
    } else {
      this.model = new PatientInsuranceModel();
      if (this.IsMedicalInsurance) {
        this.model.ID = "Medicare Part A and B";
      }
      this.model.PatientID = profile.PatientID;
      this.modal.show();
    }

  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  onChangeIsNotOnTheList(event) {
    if (this.model.IsNotOnTheList) {
      this.model.InsuranceName = '';
    }
  }

  onChangeCopay(event) {
    if (this.model.DontKnowCopay) {
      this.model.PatientCopay = null;
    }
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
