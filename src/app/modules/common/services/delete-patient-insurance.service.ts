import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { DeletePatientInsuranceModel } from '../models/delete-patient-insurance.model';

@Injectable()
export class DeletePatientInsuranceService extends BaseService<DeletePatientInsuranceModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/DeletedPatientInsurance`;
    }

    GetDeletedPatientInsurancesByPatientAsync(userID: string) {
        let url = Global.apiUrl + `/api/DeletedPatientInsurance/GetDeletedPatientInsurancesByPatientAsync/${userID}`;
        return this.httpClient.get(url) as Observable<DeletePatientInsuranceModel[]>;
    }
}
