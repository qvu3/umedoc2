import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Global from '../../../Global';
import { Observable } from 'rxjs';
import { PageData } from './base.service';
import { CPTModel, ICDModel, ModifierModel, PlaceOfServiceModel } from '../models/cpt.model';
import { InsuranceListModel } from '../models/insurance_list.model';

@Injectable()
export class UtilityService {
  public idleInterval: any;
  refreshEvent: EventEmitter<boolean> = new EventEmitter();
  refreshDocNotifyEvent: EventEmitter<boolean> = new EventEmitter();
  onNeedRefreshProvider: EventEmitter<boolean> = new EventEmitter();
  onNeedHideLayoutMain:EventEmitter<boolean> = new EventEmitter();
  constructor(public http: HttpClient) {

  }

  GenerateTwilioToken(pageUrl: string) {
    let url = Global.apiUrl + `/api/Appointment/GenerateTwilioToken?role=${pageUrl}`;
    return this.http.get(url) as Observable<string>;
  }

  needRefresh() {
    this.refreshEvent.emit(true);
  }

  needRefreshDocNotify() {
    this.refreshDocNotifyEvent.emit(true);
  }

  needRefreshProvider() {
    this.onNeedRefreshProvider.emit(true);
  }

  GetInsuranceList() {
    let url = `${Global.apiUrl}/api/Utility/GetInsuranceList`;
    return this.http.get(url) as Observable<InsuranceListModel[]>;
  }

  SearchCPT(criteria: any) {
    let url = `${Global.apiUrl}/api/Utility/SearchCPT`;
    return this.http.post(url, criteria) as Observable<PageData<CPTModel>>;
  }

  SearchICD(criteria: any) {
    let url = `${Global.apiUrl}/api/Utility/SearchICD`;
    return this.http.post(url, criteria) as Observable<PageData<ICDModel>>;
  }

  SearchModifier(criteria: any) {
    let url = `${Global.apiUrl}/api/Utility/SearchModifier`;
    return this.http.post(url, criteria) as Observable<PageData<ModifierModel>>;
  }

  SearchPlace(criteria: any) {
    let url = `${Global.apiUrl}/api/Utility/SearchPlace`;
    return this.http.post(url, criteria) as Observable<PageData<PlaceOfServiceModel>>;
  }

  CountWaitingAppointment(){
    let url= `${Global.apiUrl}/api/Appointment/CountWaitingAppointment`;
    return this.http.get(url)  as Observable<number>;
  }

  CountHeadWaitingAppointment(appointmentId: any){
    let url= `${Global.apiUrl}/api/Appointment/${appointmentId}/CountHeadWaitingAppointment`;
    return this.http.get(url)  as Observable<number>;
  }

  GetLinkS3Private(path: any){
    let url=`${Global.apiUrl}/api/Utility/GetS3PrivateImage?key=${path}`;
    return this.http.get(url)  as Observable<string>;
  }
  
  GetThumbnailS3Image(path: string){
    let url=`${Global.apiUrl}/api/Utility/GetThumbnailS3Image?key=${path}`;
    return this.http.get(url)  as Observable<string>;
  }
}
