import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { GroupApptModel } from '../models/group-appt.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupApptService extends BaseService<GroupApptModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/GroupAppt`;
  }

  GetAll(isScheduled: any) {
    let url = Global.apiUrl + `/api/GroupAppt/GetAll/${isScheduled}`;
    return this.httpClient.get(url) as Observable<GroupApptModel[]>;
  }

  GetAllActiveGroupAppt() {
    let url = Global.apiUrl + `/api/GroupAppt/GetAllActiveGroupAppt`;
    return this.httpClient.get(url) as Observable<GroupApptModel[]>;
  }

  GetByGroupProviderID(providerID: any) {
    let url = Global.apiUrl + `/api/GroupAppt/GetByGroupProviderID/${providerID}`;
    return this.httpClient.get(url) as Observable<GroupApptModel[]>;
  }

  GetIncludeByID(id: any) {
    let url = Global.apiUrl + `/api/GroupAppt/GetIncludeByID/${id}`;
    return this.httpClient.get(url) as Observable<GroupApptModel>;
  }

  createMeetingToken(apptId: any) {
    let url = Global.apiUrl + `/api/GroupAppt/meeting_token/${apptId}`;
    return this.http.post(url, apptId) as Observable<string>;
  }

  CheckAvailableGroupApptSlots(state: any) {
    let url = Global.apiUrl + `/api/GroupAppt/CheckAvailableGroupApptSlots/${state}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  Cancelled(id: any) {
    let url = Global.apiUrl + `/api/GroupAppt/Cancelled/${id}`;
    return this.httpClient.post(url, null) as Observable<GroupApptModel>;
  }

}