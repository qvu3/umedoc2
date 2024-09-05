import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { PatientRequestModel } from '../models/patient-request.model';

@Injectable()
export class PatientRequestService extends BaseService<PatientRequestModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/PatientRequest`;
  }


  GetById(id: string) {
    let url = Global.apiUrl + `/api/PatientRequest/GetById/${id}`;
    return this.httpClient.get(url) as Observable<PatientRequestModel>;
  }

  GetTotalToDo() {
    let url = Global.apiUrl + `/api/PatientRequest/GetTotalToDo`;
    return this.httpClient.get(url) as Observable<number>;
  }

  MarkStatus(id, isClosed) {
    let url = Global.apiUrl + `/api/PatientRequest/MarkStatus/${id}/${isClosed}`;
    return this.httpClient.post(url, null) as Observable<boolean>;
  }

}
