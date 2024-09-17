import { Observable } from 'rxjs';
import Global  from '../../../Global';
import { HttpClient } from '@angular/common/http';
import { AppointmentPrescriptionDocumentModel } from './../models/appointment-prescription-document.model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { DosePatientPrescription } from '../models/allergy-info.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentPrescriptionDocumentService extends BaseService<AppointmentPrescriptionDocumentModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/ApptPrescriptionDocument`;
  }

  Download(id: string) {
      let url = Global.apiUrl + `/api/ApptPrescriptionDocument/Download?id=${id}`;
      return this.http.post(url, {}) as Observable<string>;
  }

  GetByAppointmentId(id: any){
      let url = Global.apiUrl + `/api/ApptPrescriptionDocument/GetByAppointmentId/${id}`;
      return this.http.get(url) as Observable<AppointmentPrescriptionDocumentModel[]>;
  }

  GeneratePDF(appointmentId: string , list: DosePatientPrescription[]) {
      let url = Global.apiUrl + `/api/ApptPrescriptionDocument/GeneratePDF/${appointmentId}`;
      return this.httpClient.post(url, list) as Observable<boolean>;
  }

}
