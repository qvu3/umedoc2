import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PatientProfileModel } from '../../../common/models/patient-profile.model';
import { GeoGmapComponent } from '../../../common/component/geo-gmap/geo-gmap.component';
import { PharmacyModel } from 'src/app/modules/common/models/allergy-info.model';

@Component({
  selector: 'app-perfer-pharmacy-search',
  templateUrl: './perfer-pharmacy-search.component.html',
  styleUrls: ['./perfer-pharmacy-search.component.css']
})
export class PerferPharmacySearchComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('GeoMap') geoMap: GeoGmapComponent;
  @Output() onClosed: EventEmitter<any> = new EventEmitter();
  model: PatientProfileModel = new PatientProfileModel();
  constructor() {

  }

  ngOnInit() {

  }

  show() {
    var latitude = this.model.PreferredPharmacyLat ? this.model.PreferredPharmacyLat : 26.314672;
    var longtitude = this.model.PreferredPharmacyLng ? this.model.PreferredPharmacyLng : -81.789216;
    this.geoMap.initMap(null, latitude, longtitude);
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  selectPharmacy(pharmacy: PharmacyModel) {
    if (pharmacy) {
      var latMarker = pharmacy.Latitude;
      var longMarker = pharmacy.Longitude;
      var phone = pharmacy.PrimaryPhone;
      var name = pharmacy.StoreName;
      this.onClosed.emit({
        PharmacyId: pharmacy.PharmacyId,
        PreferredPharmacy: name,
        PreferredPharmacyAddress: pharmacy.Address1,
        PreferredPharmacyAddress2: pharmacy.Address2,
        PreferredPharmacyState: pharmacy.State,
        PreferredPharmacyZipCode: pharmacy.ZipCode,
        PreferredPharmacyCity: pharmacy.ZipCode,
        PreferredPharmacyLat: latMarker,
        PreferredPharmacyLng: longMarker,
        PreferredPharmacyPhoneNumber: phone
      })
      this.hide();
    }
  }

}
