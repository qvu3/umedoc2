import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { GroupApptPatientModel } from '../models/group-appt-patient.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupApptPatientService extends BaseService<GroupApptPatientModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/GroupApptPatient`;
  }

  GetAll() {
    let url = Global.apiUrl + `/api/GroupApptPatient/GetAll`;
    return this.httpClient.get(url) as Observable<GroupApptPatientModel[]>;
  }

  SaveInviteUser(entity: any) {
    let url = Global.apiUrl + `/api/GroupApptPatient/SaveInviteUser`;
    return this.httpClient.post(url, entity) as Observable<GroupApptPatientModel>;
  }


  GetAllGroupApptPatientByUserID(patientID: any) {
    let url = Global.apiUrl + `/api/GroupApptPatient/GetAllGroupApptPatientByUserID/${patientID}`;
    return this.httpClient.get(url) as Observable<GroupApptPatientModel[]>;
  }

  Cancelled(id: any) {
    let url = Global.apiUrl + `/api/GroupApptPatient/Cancelled/${id}`;
    return this.httpClient.post(url, null) as Observable<GroupApptPatientModel>;
  }

  GetNumberGroupApptOfPatient() {
    let url = Global.apiUrl + `/api/GroupApptPatient/GetNumberGroupApptOfPatient`;
    return this.httpClient.get(url) as Observable<number>;
  }

}