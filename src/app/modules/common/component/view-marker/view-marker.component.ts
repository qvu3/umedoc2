import { Component, OnInit, Input, OnChanges } from '@angular/core';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-view-marker',
  templateUrl: './view-marker.component.html',
  styleUrls: ['./view-marker.component.css']
})
export class ViewMarkerComponent implements OnInit, OnChanges {
  @Input() address: any;
  map: any;
  currentMarker: any;
  constructor() { }

  ngOnInit() {
    this.initMap(14);
  }

  ngOnChanges(changes: any) {
    if (changes && changes.address && changes.address.currentValue && changes.address.currentValue != changes.address.previousValue) {
      this.initMap(14);
    }
  } 

  initMap(zoom: number) {
    var latlng = new google.maps.LatLng(null, null);
    var myOptions = {
      zoom: zoom ? zoom : 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: false,
      disableDefaultUI: true,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(document.getElementById('mapMaker'), myOptions);
    this.createMarker();
  }

  public createMarker() {
    if (this.currentMarker) {
      this.currentMarker.setMap(null);
    }

    var latlng = new google.maps.Geocoder();
    latlng.geocode({ 'address': this.address }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status === 'OK') {
        this.currentMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          animation: google.maps.Animation.DROP,
        });
        google.maps.event.trigger(this.map, 'resize');
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
}
