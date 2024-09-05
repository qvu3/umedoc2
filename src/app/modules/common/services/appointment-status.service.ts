import { Injectable } from '@angular/core';
import { AppointmentStatusModel } from '../models/appointment-status.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentStatusService extends BaseService<AppointmentStatusModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentStatus`;
    }

    GetAll() {
        let url = Global.apiUrl + `/api/AppointmentStatus/GetAll`;
        return this.httpClient.get(url) as Observable<AppointmentStatusModel[]>;
    }
}
