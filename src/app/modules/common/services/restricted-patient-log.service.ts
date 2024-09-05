import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import RestrictedPatientLogModel from '../models/restricted-patient-log.model';

@Injectable()
export class RestrictedPatientLogService extends BaseService<RestrictedPatientLogModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/RestrictedPatientLog`;
    }

    SearchAsync(criteria) {
        let url = Global.apiUrl + `/api/RestrictedPatientLog/SearchAsync`;
        return this.httpClient.post(url, criteria) as Observable<RestrictedPatientLogModel[]>;
    }

    ChangeRestrictPatient(id) {
        let url = Global.apiUrl + `/api/RestrictedPatientLog/ChangeRestrictPatient/${id}`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }
}
