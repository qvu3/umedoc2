import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { PatientInsuranceModel, S3Model } from '../models/patient-insurance.model';

@Injectable()
export class PatientInsuranceService extends BaseService<PatientInsuranceModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientInsurance`;
    }

    GetByPatientID(userID: string) {
        let url = Global.apiUrl + `/api/PatientInsurance/GetByPatientID/${userID}`;
        return this.httpClient.get(url) as Observable<PatientInsuranceModel[]>;
    }

    RemovedByPatientID(userID: string) {
        let url = Global.apiUrl + `/api/PatientInsurance/RemovedByPatientID/${userID}`;
        return this.httpClient.delete(url) as Observable<boolean>;
    }

    DeleteS3Image(key: string) {
        var s3Object = new S3Model();
        s3Object.Key = key;

        let url = Global.apiUrl + `/api/PatientInsurance/DeleteS3Image`;
        return this.httpClient.post(url, s3Object) as Observable<boolean>;
    }
}
