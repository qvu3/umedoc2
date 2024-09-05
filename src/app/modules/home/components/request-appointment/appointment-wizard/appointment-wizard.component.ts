import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { AppointmentImageModel } from 'src/app/modules/common/models/appointment-image.model';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { AppointmentReasonModel } from 'src/app/modules/common/models/appointment-reason.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { AppointmentReasonService } from 'src/app/modules/common/services/appointment-reason.service';
import { AppointmentReasonAssignmentModel } from 'src/app/modules/common/models/appointment-reason-assignment.model';
@Component({
  selector: 'app-appointment-wizard',
  templateUrl: './appointment-wizard.component.html',
  styleUrls: ['./appointment-wizard.component.css']
})
export class AppointmentWizardComponent extends BaseComponent implements OnInit {
  @Input() model: AppointmentModel = new AppointmentModel();
  @Output() onSaveChange: EventEmitter<boolean> = new EventEmitter();
  company: CompanyModel;
  reasons: Array<AppointmentReasonModel> = new Array<AppointmentReasonModel>();
  isUploading: boolean = false;
  isReasonRequired: boolean = true;
  IsSubmitting: boolean = true;

  constructor(private cdf: ChangeDetectorRef,
    private reasonService: AppointmentReasonService,
    public authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  ngOnInit() {
    this.getReason();
  }

  selectReason(id) {
    this.model.ReasonID = id;
  }

  getReason() {
    this.reasonService.GetAll().subscribe(r => {
      this.reasons = r;
      this.changeCheckAppointmentReason(this.reasons, this.model.AppointmentReasonList);
    });
  }


  removeAttach(img) {
    var index = this.model.AppointmentImageList.findIndex(c => c.ImagePath == img.ImagePath);
    this.model.AppointmentImageList.splice(index, 1);
  }

  uploadStatus(isCompleted) {
    this.isUploading = !isCompleted;
  }

  uploaded(clinicalImageObject) {
    if (clinicalImageObject) {
      var imgModel = new AppointmentImageModel();
      imgModel.ImagePath = clinicalImageObject.ImagePath;
      imgModel.ImageName = clinicalImageObject.ImageName;
      this.model.AppointmentImageList.push(imgModel);
    }
  }

  changeAppointmentReason(id) {
    var index = this.model.AppointmentReasonList.findIndex(c => c.AppointmentReasonID == id);
    if (index >= 0) {
      this.model.AppointmentReasonList.splice(index, 1);
    }
    else {
      var psa = new AppointmentReasonAssignmentModel();
      var reason = this.reasons.filter(c => c.ID == id);
      if (reason) {
        psa.AppointmentReason = reason[0];
      }

      psa.AppointmentReasonID = id;
      this.model.AppointmentReasonList.push(psa);
    }

    this.changeCheckAppointmentReason(this.reasons, this.model.AppointmentReasonList);
  }

  changeCheckAppointmentReason(source, list) {
    if (source && list) {
      source.forEach(item => {
        item.IsChecked = false;
        list.forEach(psa => {
          if (item.ID == psa.AppointmentReasonID)
            item.IsChecked = true;
        });
      });
    }

    if (!(this.model.AppointmentReasonList && this.model.AppointmentReasonList.length > 0)) {
      this.isReasonRequired = true;
    } else {
      this.isReasonRequired = false;
    }
  }
  check() {
    if (!(this.model.AppointmentReasonList && this.model.AppointmentReasonList.length > 0)) {
      this.isReasonRequired = true;
      return;
    } else {
      this.isReasonRequired = false;
    }
    this.onSaveChange.emit(true);
  }
}
