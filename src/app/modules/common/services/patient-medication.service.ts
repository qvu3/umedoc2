import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { PatientMedicationModel } from '../models/patient-allergy.model';

@Injectable()
export class PatientMedicationService extends BaseService<PatientMedicationModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientMedication`;
    }

    GetAll() {
        let url = Global.apiUrl + `/api/PatientMedication/GetAll`;
        return this.httpClient.get(url) as Observable<PatientMedicationModel[]>;
    }
}
