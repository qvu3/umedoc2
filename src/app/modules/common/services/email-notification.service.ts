import { Injectable } from '@angular/core';
import { EmailNotificationModel } from '../models/email-notification.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';

@Injectable()
export class EmailNotificationService extends BaseService<EmailNotificationModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/EmailNotification`;
    }
}
