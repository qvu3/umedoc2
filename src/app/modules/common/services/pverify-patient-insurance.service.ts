import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { S3Model } from '../models/patient-insurance.model';
import { PverifyPatientInsuranceModel } from '../models/pverify-patient-insurance.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PverifyPatientInsuranceService extends BaseService<PverifyPatientInsuranceModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/PverifyPatientInsurance`;
  }

  getByPatient(patientId: string) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/GetByPatientId/${patientId}`;
    return this.httpClient.get(url) as Observable<PverifyPatientInsuranceModel[]>;
  }

  getActiveByPatientID(patientId: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/GetActiveByPatientID/${patientId}`;
    return this.httpClient.get(url) as Observable<PverifyPatientInsuranceModel>;
  }

  

  Disable(entity: { IsChargePatient: any; }) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/Disable`;
    return this.httpClient.post(url, entity);
  }

  CheckLimitAddingInsurance(id: any, insuranceType: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/CheckLimitAddingInsurance/${id}/${insuranceType}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  ReCheck(patientId: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/ReCheck/${patientId}`;
    return this.httpClient.get(url) as Observable<PverifyPatientInsuranceModel[]>;
  }


  SetFinalCopay(entity: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/Put`;
    return this.httpClient.put(url, entity);
  }

  CheckBookingInsuranceByPatientID(patientId: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/CheckBookingInsuranceByPatientID/${patientId}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  Enabled(id: any) {
    let url = Global.apiUrl + `/api/PverifyPatientInsurance/Enabled/${id}`;
    return this.httpClient.post(url, null) as Observable<boolean>;
  }

  DeleteS3Image(key: string) {
    var s3Object = new S3Model();
    s3Object.Key = key;

    let url = Global.apiUrl + `/api/PverifyPatientInsurance/DeleteS3Image`;
    return this.httpClient.post(url, s3Object) as Observable<boolean>;
}
}

