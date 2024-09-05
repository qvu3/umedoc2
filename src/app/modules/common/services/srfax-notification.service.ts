import { Injectable } from '@angular/core';
import { SRFaxNotificationModel } from '../models/srfax-notification.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';

@Injectable()
export class SRFaxNotificationService extends BaseService<SRFaxNotificationModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/SRFaxNotification`;
    }
}
