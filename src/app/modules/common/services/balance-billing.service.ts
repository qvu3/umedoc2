import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from 'src/app/Global';
import { InsuranceBalanceBillingModel } from '../models/balance-billing.model';
import { PatientProfileModel } from '../models/patient-profile.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceBillingService extends BaseService<InsuranceBalanceBillingModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/BalanceBilling`;
  }

  payNow(id) {
    let url = Global.apiUrl + `/api/BalanceBilling/PayNow/${id}`;
    return this.httpClient.post(url, null) as Observable<boolean>;
  }

  getPatientInfo(id) {
    let url = Global.apiUrl + `/api/BalanceBilling/GetPatientInfo/${id}`;
    return this.httpClient.get(url) as Observable<PatientProfileModel>;
  }

  countBalanceBilling() {
    let url = Global.apiUrl + `/api/BalanceBilling/CountBalanceNotPaid`;
    return this.httpClient.get(url) as Observable<number>;
  }

  createOrUpdateCardInfo(cardInfo) {
    let url = Global.apiUrl + `/api/BalanceBilling/UpdateCardInfo`;
    return this.http.post(url, cardInfo) as Observable<boolean>;
  }

}
