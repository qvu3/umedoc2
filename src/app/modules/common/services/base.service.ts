import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRequestModel } from '../models/patient-request.model';
import { PverifyPatientInsuranceModel } from '../models/pverify-patient-insurance.model';
import { TicketModel } from '../models/ticket.model';
import { VideoCallHistoryModel } from '../models/video-call-history.model';

export interface PageData<T> {
  Data: T[];
  TotalRecords: number;
}
@Injectable()
export class BaseService<T> {
  public resource!: string;
  constructor(protected httpClient: HttpClient) {
  }

  Search(criteria: any) {
    let url = `${this.resource}/Search`;
    return this.httpClient.post(url, criteria) as Observable<PageData<T>>;
  }

  Get(id: string) {
    let url = `${this.resource}/GetById/${id}`;
    return this.httpClient.get(url) as Observable<T>;
  } 

  Create(entity: VideoCallHistoryModel | PverifyPatientInsuranceModel | TicketModel | PatientRequestModel) {
    let url = `${this.resource}/Post`;
    return this.httpClient.post(url, entity) as Observable<T>;
  }

  Edit(entity: T) {
    let url = `${this.resource}/Put`;
    return this.httpClient.put(url, entity) as Observable<T>;
  }

  Update(entity: T) {
    let url = `${this.resource}/Update`;
    return this.httpClient.post(url, entity) as Observable<T>;
  }

  Delete(id: string) {
    let url = `${this.resource}/Delete/${id}`;
    return this.httpClient.delete(url) as Observable<boolean>;
  }
}
