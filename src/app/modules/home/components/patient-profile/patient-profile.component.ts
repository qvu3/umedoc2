import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import UserModel from 'src/app/modules/common/models/user.model';
import { UserService } from 'src/app/modules/common/services/user.service';
import { CardInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { CardInfoComponent } from '../card-info/card-info.component';
import { PatientHistoryAppointmentComponent } from './patient-history-appointment/patient-history-appointment.component';
import { PerferPharmacySearchComponent } from '../perfer-pharmacy-search/perfer-pharmacy-search.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';

declare var $: any;

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent extends BaseComponent implements OnInit {
  patientUser: UserModel = new UserModel();
  model: PatientProfileModel = new PatientProfileModel();
  @ViewChild('cardInfoModal') cardInfoModal: CardInfoComponent;
  @ViewChild('patientHistory') patientHistory: PatientHistoryAppointmentComponent;
  @ViewChild('pharamcySearch') pharamcySearch: PerferPharmacySearchComponent;
  constructor(public authService: AuthenticationService,
    public userService: UserService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService,
    private providerProfileService: ProviderProfileService,
    private router: Router) {
    super(authService);
  }

  ngOnInit() {
    this.getEntity();
  }

  getEntity() {
    this.patientProfileService.GetIncludePatientUser(this.currentUser.Id).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
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

  goToDemand() {
    this.providerProfileService.CountAvailable().subscribe(r => {
      if (r > 0) {
        this.router.navigate(['/request-appointment']);
      }
      else {
        this.dialog.showSwalWarningAlert("Non-Business Hours", "Please come back at our business hours: 8AM - 6PM. Or click Schedule An Appointment to book a future visit with provider");
      }
    });
  }

  clickEditPatientFrofile(id) {
    this.router.navigate(['/edit-patient-profile'], { queryParams: { group: id } });
  }

  changeCreditCard() {
    if (this.currentUser)
      this.cardInfoModal.show();
  }

  refreshHistory() {
    this.patientHistory.RefreshTable();
  }

  updatePreferedPharmacy() {
    if (this.currentUser) {
      this.pharamcySearch.model = this.model;
      this.pharamcySearch.show();
    }
  }

  getAddressMarker() {
    if (this.model && this.model.PreferredPharmacyAddress)
      return `${this.model.PreferredPharmacyAddress}, ${this.model.PreferredPharmacyCity}, ${this.model.PreferredPharmacyState} ${this.model.PreferredPharmacyZipCode}`;
    return '';
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
          this.getEntity()
        }
      }, error => {
        this.dialog.showToastrError('Pharmacy', 'Cannot save your prefer pharmacy, please try again');
      });
    }
  }
}
