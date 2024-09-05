import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PerferPharmacySearchComponent } from '../../perfer-pharmacy-search/perfer-pharmacy-search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-prefer-pharmacy',
  templateUrl: './patient-prefer-pharmacy.component.html',
  styleUrls: ['./patient-prefer-pharmacy.component.css']
})
export class PatientPreferPharmacyComponent extends BaseComponent implements OnInit {
  model: PatientProfileModel = new PatientProfileModel();
  @ViewChild('pharamcySearch') pharamcySearch: PerferPharmacySearchComponent;
  patientId: string;
  constructor(authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private activeRouter: ActivatedRoute,
    private dialog: CommonDialogService) {
    super(authService);
    this.patientId = this.currentUser.Id;
    activeRouter.parent.params.subscribe(r => {
      this.patientId = r && r['{id}'] ? r['{id}'] : this.currentUser.Id;
    });
  }

  ngOnInit(): void {
    this.getEntity();
  }

  getEntity() {
    this.patientProfileService.GetIncludePatientUser(this.patientId).subscribe(r => {
      if (r) {
        this.model = r;
      }
    });
  }

  updatePreferedPharmacy() {
    if (this.patientId) {
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
