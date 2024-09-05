import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { UserService } from 'src/app/modules/common/services/user.service';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PerferPharmacySearchComponent } from 'src/app/modules/home/components/perfer-pharmacy-search/perfer-pharmacy-search.component';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { InsuranceUpdateComponent } from 'src/app/modules/home/components/insurance-update/insurance-update.component';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
import { DeletePatientInsuranceService } from 'src/app/modules/common/services/delete-patient-insurance.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-profile-view',
  templateUrl: './patient-profile-view.component.html',
  styleUrls: ['./patient-profile-view.component.css'],
  providers:[DatePipe]
})
export class PatientProfileViewComponent extends BaseComponent implements OnInit {
  patientUser: UserModel = new UserModel();
  model: PatientProfileModel = new PatientProfileModel();
  isShowDeletedInsurance: boolean = false;
  @Input() appointmentID: string;
  @Input() isShowEditButton: boolean = true;
  @Input() hideDemographic:boolean=false;
  @Input() hidePreferPhamacy:boolean=false;
  @Input() hideInsuranceInfo:boolean=false;
  @Input() hideCreditCard:boolean=false;
  @Input() hideEmergencyContact:boolean=false;
  @Input() hideAllergies:boolean=false;
  @Input() hideMedicalCondition:boolean=false;
  @Input() hideMedication:boolean=false;
  @Input() hidePverifyInsurance:boolean=false;
  @Input() hidePrizm: boolean = false;
  @ViewChild('pharamcySearch') pharamcySearch: PerferPharmacySearchComponent;
  @ViewChild('insuranceUpdateModal') insuranceUpdateModal: InsuranceUpdateComponent;
  constructor(public authService: AuthenticationService,
    public userService: UserService,
    private router: Router,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService,
    private patientInsuranceService: PatientInsuranceService,
    private appointmentService: AppointmentService,
    private deletedPatientInsuranceService: DeletePatientInsuranceService,
    private datePipe: DatePipe) {
    super(authService);
  }

  ngOnInit() {
    if (this.appointmentID) {
      this.getEntityPatient(this.appointmentID);
    }
  }

  getEntityPatient(id) {
    this.model = new PatientProfileModel();
    if (id) {
      this.patientProfileService.GetByAppointment(id).subscribe(r => {
        if (r) {
          this.model = r;
        }
      });
    }
  }

  calAgePatient() {
    if (this.model.PatientUser != null && this.model.PatientUser.DOB) {
      var ages = this.calculateAge(new Date(this.model.PatientUser.DOB));
      if (ages) {
        return `(${ages} years old)`;
      }
    }
    return '';
  }

  transformDob(data) {
    if(!data) return '';
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }

  declineInvalidInsurance() {
    if (this.model && this.model.PatientInsurances
      && this.model.PatientInsurances.length > 0 && this.appointmentID) {
      this.appointmentService.DeclineInvalidInsurance(this.appointmentID).subscribe(r => {
        if (r) {
          this.dialog.showSwalSuccesAlert('Decline Insurance', 'Hold $69 successfully');
        }
        else {
          this.dialog.showSwalWarningAlert('Decline Insurance', "Insufficient funds. Patient's account has been locked.");
        }
      }, error => {
        this.dialog.showSwalErrorAlert('Decline Insurance', 'Cannot Decline Insurance, contact administrator to support');
      });
    }
  }

  declineOutOfNetwork() {
    if (this.model && this.model.PatientInsurances
      && this.model.PatientInsurances.length > 0 && this.appointmentID) {
      this.appointmentService.DeclineOutOfNetwork(this.appointmentID).subscribe(r => {
        if (r) {
          this.getEntityPatient(this.appointmentID);
          this.dialog.showSwalSuccesAlert('Decline Insurance', 'Hold $69 successfully');
        }
        else {
          this.dialog.showSwalWarningAlert('Decline Insurance', "Insufficient funds. Patient's account has been locked.");
        }
      }, error => {
        this.dialog.showSwalErrorAlert('Decline Insurance', 'Cannot Decline Insurance, contact administrator to support');
      });
    }
  }

  ChangeDeclineInsurance(event) {
    switch (event.target.value) {
      case "InvalidInsurance":
        this.declineInvalidInsurance();
        break;
      case "OutOfNetwork":
        this.declineOutOfNetwork();
        break;
      default:
        break;
    }
  }

  getAddressMarker() {
    if (this.model && this.model.PreferredPharmacyAddress)
      return `${this.model.PreferredPharmacyAddress}, ${this.model.PreferredPharmacyCity}, ${this.model.PreferredPharmacyState} ${this.model.PreferredPharmacyZipCode}`;
    return '';
  }

  checkExistOtherAllergyName(list, nameCheck) {
    if (list && nameCheck) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item[nameCheck] && item[nameCheck].AllergyName.trim() == 'Others') {
          return true;
        }
      }
    }
    return false;
  }

  checkExistOtherMedicalConditionName(list, nameCheck) {
    if (list && nameCheck) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item[nameCheck] && item[nameCheck].MedicalConditionName.trim() == 'Others') {
          return true;
        }
      }
    }
    return false;
  }

  checkExistOtherMedicationName(list, nameCheck) {
    if (list && nameCheck) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item[nameCheck] && item[nameCheck].MedicationName.trim() == 'Others') {
          return true;
        }
      }
    }
    return false;
  }

  editPatientInfo(id) {
    this.router.navigateByUrl(`/management/patient-detail-view/${id}`);
  }

  updatePreferedPharmacy() {
    if (this.currentUser) {
      this.pharamcySearch.model = this.model;
      this.pharamcySearch.show();
    }
  }

  closePerfer(event) {
    if (event) {
      this.model.PharmacyId = event.PharmacyId;
      this.model.PreferredPharmacy = event.PreferredPharmacy;
      this.model.PreferredPharmacyAddress = event.PreferredPharmacyAddress;
      this.model.PreferredPharmacyAddress2 = event.PreferredPharmacyAddress2;
      this.model.PreferredPharmacyState = event.PreferredPharmacyState;
      this.model.PreferredPharmacyCity = event.PreferredPharmacyCity;
      this.model.PreferredPharmacyZipCode = event.PreferredPharmacyZipCode;
      this.model.PreferredPharmacyLat = event.PreferredPharmacyLat;
      this.model.PreferredPharmacyLng = event.PreferredPharmacyLng;
      this.model.PreferredPharmacyPhoneNumber = event.PreferredPharmacyPhoneNumber;

      this.patientProfileService.UpdatePharmacy(this.model).subscribe(r => {
        if (r) {
          this.getEntityPatient(this.appointmentID);
        }
      }, error => {
        this.dialog.showToastrError('Pharmacy', 'Cannot save your prefer pharmacy, please try again');
      });
    }
  }

  addInsurance() {
    if (this.model.PatientID) {
      var pm = new PatientInsuranceModel();
      pm.PatientID = this.model.PatientID;
      this.insuranceUpdateModal.show(pm);
    }
  }

  changeInsurance(id) {
    if (id) {
      this.patientInsuranceService.Get(id).subscribe(r => {
        if (r) {
          this.insuranceUpdateModal.show(r);
        }
      });
    }
  }

  onCloseInsurance(event) {
    if (event) {
      this.getEntityPatient(this.appointmentID);
    }
  }

  removeItemInsurance(id) {
    this.patientInsuranceService.Delete(id).subscribe(r => {
      if (r) {
        this.patientInsuranceService.GetByPatientID(this.model.PatientID).subscribe(result => {
          if (result) {
            this.model.PatientInsurances = result;
          }
        });

        this.deletedPatientInsuranceService.GetDeletedPatientInsurancesByPatientAsync(this.model.PatientID).subscribe(k => {
          if (k) {
            this.model.DeletedPatientInsurances = k;
          }
        });
      }
    });
  }

  setShowDeletedInsurance() {
    this.isShowDeletedInsurance = !this.isShowDeletedInsurance;
  }
}