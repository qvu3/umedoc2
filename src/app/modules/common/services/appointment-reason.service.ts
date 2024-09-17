import { Injectable } from '@angular/core';
import { AppointmentReasonModel } from '../models/appointment-reason.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentReasonService extends BaseService<AppointmentReasonModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentReason`;
    }

    GetAll() {
        let url = Global.apiUrl + `/api/AppointmentReason/GetAll`;
        return this.httpClient.get(url) as Observable<AppointmentReasonModel[]>;
    }

    UpdateSortOrder(entities: any){
        let url = Global.apiUrl + `/api/AppointmentReason/UpdateSortOrder`;
        return this.httpClient.post(url,entities) as Observable<boolean>;
    }
}
