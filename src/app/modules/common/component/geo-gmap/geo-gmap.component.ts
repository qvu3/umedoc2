import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PharmacyCriteria } from '../../criterias/pharmacy.criteiral';
import Global from '../../../../Global';
import { BaseComponent } from '../../../../modules/base.component';
import { AuthenticationService } from '../../services/authentication.service';
import { PatientProfileService } from '../../services/patient-profile.service';
import { CommonDialogService } from '../../services/dialog.service';
import { param } from 'jquery';
import { PharmacyModel } from '../../models/allergy-info.model';
// import { setTimeout } from 'timers';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-geo-gmap',
  templateUrl: './geo-gmap.component.html',
  styleUrls: ['./geo-gmap.component.css']
})
export class GeoGmapComponent extends BaseComponent implements OnInit, OnChanges {
  model: PharmacyCriteria = new PharmacyCriteria;
  @Input()
  id!: string;
  @Input() city: any;
  @Input() state: any;
  @Input() address: any;
  @Input() zipcode: any;
  @Input()
  name!: string;
  @Output() onSelected: EventEmitter<any> = new EventEmitter();
  service: any;
  @BlockUI()
  blockUI!: NgBlockUI;
  states: any;
  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService) {
    super(authService);
  }
  map: google.maps.Map | null = null;
  markers: google.maps.Marker[] = [];
  currentmarker: any;
  currentWindow: any;
  listPharmacy: PharmacyModel[] = [];
  isLoadMore: boolean = false;
  Pagination: any;
  override ngOnInit() {
    this.model = new PharmacyCriteria();
    this.initMap(null, null, null);
    this.states = Global.US_StateList;
  }

  checkRequireAtLeastField() {
    return !this.model.Address && !this.model.City && !this.model.Name && !this.model.State && !this.model.ZipCode
  }

  search() {
    if (this.checkRequireAtLeastField()) {
      return;
    }
    this.clearAllMarker();
    this.patientProfileService.SearchPharmacy(this.model).subscribe(r => {
      this.listPharmacy = r;
      this.showResult();
    });
  }

  ngOnChanges(params: SimpleChanges) {
    var isChange = false;
    if (params && params['zipcode'] && params['zipcode'].currentValue && params['zipcode'].currentValue != params['zipcode'].previousValue) {
      this.model.ZipCode = params['zipcode'].currentValue;
      isChange = true;
    }

    if (isChange) {
      this.search();
    }
  }


  initMap(zoom: null, latitude: number | null, longtitude: number | null) {
    var latlng = new google.maps.LatLng(latitude, longtitude);

    var myOptions = null;
    myOptions = {
      zoom: zoom ? zoom : 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      fullscreenControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      pancontrol: true,
    };

    this.map = new google.maps.Map(document.getElementById('gmap'), myOptions);
    this.showResult();
  }

  showResult() {
    for (var i = 0; i < this.listPharmacy.length; i++) {
      var place = this.listPharmacy[i];
      this.createMarker(place, (i + 1), 0);
    }
  }

  clearAllMarker() {
    this.listPharmacy = [];
    if (this.markers) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }
  }

  public createMarker(pharmacy: PharmacyModel, index: number , count: number) {
    var geocoder = new google.maps.Geocoder();
    var address = `${pharmacy.Address1}, ${pharmacy.City}, ${pharmacy.State} ${pharmacy.ZipCode}`;
    setTimeout(() => {
      geocoder.geocode({ 'address': address }, (results: any, status: string) => {
        // console.log(`result at ${index} = ${status}`);
        if (status === 'OK') {
          this.registerMarkerEvent(results, index, pharmacy);
        }
      });
    }, 1000 * index);
  }

  public registerMarkerEvent(results: { geometry: { location: any; }; }[], index: string | number, pharmacy: PharmacyModel) {
    if(!results || !results[0]) return ;
    var myLatlng = results[0].geometry.location
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      label: index + ''
    });

    google.maps.event.trigger(this.map, 'resize');
    google.maps.event.addListener(this.map, "click", (event: any) => {
      if (this.currentWindow) {
        this.currentWindow.close();
      }
    });
    google.maps.event.addListener(marker, "mouseout", () => {
      if (this.currentWindow) {
        setTimeout(() => {
          this.currentWindow.close();
        }, 2000);
      }
    });
    google.maps.event.addListener(marker, "mouseover", () => {
      if (this.currentWindow) {
        setTimeout(() => {
          this.currentWindow.close();
        }, 2000);
      }
      this.showWindowInfo(marker, pharmacy, myLatlng);
    });

    google.maps.event.addListener(marker, "click", (e: any) => {
      if (this.currentWindow) {
        setTimeout(() => {
          this.currentWindow.close();
        }, 2000);
      }
      this.showWindowInfo(marker, pharmacy, myLatlng);
    });
    this.markers.push(marker);
    if (index == 1) {
      if (this.map) {
        this.map.setCenter(myLatlng);
      }
    }
  }

  showWindowInfo(marker: any, pharmacy: PharmacyModel, pharmacyInfo: { StoreName: any; Address1: any; Address2: any; City: any; State: any; ZipCode: any; PharmacyId: string; }) {
      var contentHtml = `<div>
      <h5>${pharmacy.StoreName}</h5>
      <p>${pharmacy.Address1} ${pharmacy.Address2 ? pharmacy.Address2 : ''}, ${pharmacy.City}, ${pharmacy.State} ${pharmacy.ZipCode}</p>
      <div class="col-md-12 m-b-5">
      <button id="pharmacy_${pharmacy.PharmacyId}" class="btn btn-warning" type="button">Select</button></div>
      </div>`;
      this.currentWindow = new google.maps.InfoWindow({
        content: contentHtml
      });
      // this.map.setCenter(myLatlng);
      this.currentWindow.open(this.map, marker);
      setTimeout(() => {
        $('#pharmacy_' + pharmacy.PharmacyId).unbind('click');
        $('#pharmacy_' + pharmacy.PharmacyId).bind('click', () => {
          this.onSelected.emit(pharmacy);
        });
      }, 700);
    }

  public zoomMarker(pharmacy: { Latitude: any; Longitude: any; }) {
    if (pharmacy && this.map) {
      var myLatlng = new google.maps.LatLng(pharmacy.Latitude,
        pharmacy.Longitude);
      this.map.setCenter(myLatlng);
      this.map.setZoom(14);
    }
  }

  public selectMarker(pharmacy: any) {
    this.onSelected.emit(pharmacy);
  }

  getStyleResult() {
    var height = $('#geoMapModal').height();
    var searchBoxHeight = $('#search-box').height();
    return {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'bottom': '26px',
      'right': 0,
      'overflow-y': 'scroll',
      'font-size': '14px',
      'height': `${height - searchBoxHeight}px`
    }
  }

}
