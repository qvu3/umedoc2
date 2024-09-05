import { Injectable } from '@angular/core';
import { PatientAllergyModel } from '../models/patient-allergy.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class PatientAllergyService extends BaseService<PatientAllergyModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientAllergy`;
    }

    GetAll() {
        let url = Global.apiUrl + `/api/PatientAllergy/GetAll`;
        return this.httpClient.get(url) as Observable<PatientAllergyModel[]>;
    }
}
