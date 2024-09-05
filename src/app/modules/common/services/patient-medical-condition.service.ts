import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { PatientMedicalConditionModel } from '../models/patient-allergy.model';

@Injectable()
export class PatientMedicalConditionService extends BaseService<PatientMedicalConditionModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientMedicalCondition`;
    }

    GetAll() {
        let url = Global.apiUrl + `/api/PatientMedicalCondition/GetAll`;
        return this.httpClient.get(url) as Observable<PatientMedicalConditionModel[]>;
    }
}
