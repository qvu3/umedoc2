import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from 'express';
import Global from 'src/app/Global';
import { BaseComponent } from 'src/app/modules/base.component';
import { PharmacyCriteria } from 'src/app/modules/common/criterias/pharmacy.criteiral';
import { PharmacyModel } from 'src/app/modules/common/models/allergy-info.model';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
declare var $: any;
@Component({
  selector: 'app-seach-dose-pharmacy',
  templateUrl: './seach-dose-pharmacy.component.html',
  styleUrls: ['./seach-dose-pharmacy.component.css']
})
export class SeachDosePharmacyComponent extends BaseComponent implements OnInit,
  AfterViewInit {
  criteria: PharmacyCriteria = new PharmacyCriteria();

  stateList: any = [];
  pharmacies: Array<PharmacyModel> = new Array<PharmacyModel>();
  @ViewChild('doseTable') doseTable: ElementRef;
  constructor(public authService: AuthenticationService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService) {
    super(authService);
  }

  ngOnInit() {
    this.stateList = Global.US_StateList;
  }

  ngAfterViewInit() {

  }

  RefreshTable() {
    if(this.validateLeastAField()) return;
    this.patientProfileService.SearchPharmacy(this.criteria)
      .subscribe(r => {
        this.pharmacies = r;
      })
  }

  validateLeastAField() {
    return !this.criteria.Address && !this.criteria.City && !this.criteria.Name && !this.criteria.PhoneOrFax && !this.criteria.State && !this.criteria.ZipCode;
  }

}
