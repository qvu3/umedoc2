import { Injectable } from '@angular/core';
import { SMSNotificationModel } from '../models/sms-notification.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';

@Injectable()
export class SMSNotificationService extends BaseService<SMSNotificationModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/SMSNotification`;
    }
}
