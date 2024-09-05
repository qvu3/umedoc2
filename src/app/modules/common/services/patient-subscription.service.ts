import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from 'src/app/Global';
import { PatientStorage } from '../models/patient-storage.model';
import { PatientSubscriptionModel } from '../models/patient-subscription.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PatientSubscriptionService extends BaseService<PatientSubscriptionModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/PatientSubscription`;
  }

  GetByPatientId(userID) {
    let url = Global.apiUrl + `/api/PatientSubscription/GetByPatientUser/${userID}`;
    return this.httpClient.get(url) as Observable<PatientSubscriptionModel[]>;
  } 

  GetById(id) {
    let url = Global.apiUrl + `/api/PatientSubscription/GetById/${id}`;
    return this.httpClient.get(url) as Observable<PatientSubscriptionModel>;
  }

  CancelledSubscription(subscriptionId) {
    let url = Global.apiUrl + `/api/PatientSubscription/CancelledSubscription/${subscriptionId}`;
    return this.httpClient.post(url, null) as Observable<boolean>;
  }

  CheckExistsPlanInPatientUser(userID) {
    let url = Global.apiUrl + `/api/PatientSubscription/CheckExistsPlanInPatientUser/${userID}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }
}
