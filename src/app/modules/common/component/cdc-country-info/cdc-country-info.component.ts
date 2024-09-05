import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppointmentService } from '../../services/appointment.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-cdc-country-info',
  templateUrl: './cdc-country-info.component.html',
  styleUrls: ['./cdc-country-info.component.css']
})
export class CdcCountryInfoComponent implements AfterViewInit {
  @ViewChild('countryCdc') countryCdc: ElementRef;
  html: any;
  destination: string = 'united-states';
  urlFormat = 'https://wwwnc.cdc.gov/travel/destinations/traveler/none';
  url = `${this.urlFormat}/${this.destination}`;
  constructor(authService: AuthenticationService, private appointmentService: AppointmentService,
    private sanitized: DomSanitizer) {

  }

  ngAfterViewInit(): void {
    this.onChangeCountry();
  }

  onChangeCountry(){
    this.url = `${this.urlFormat}/${this.destination}`;
    var iframe = this.countryCdc.nativeElement; 
    iframe.src = this.url;
    //window.frames['cdcframe'].location.reload();
  } 
}