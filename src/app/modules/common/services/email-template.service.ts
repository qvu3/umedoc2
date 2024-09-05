import { Injectable } from '@angular/core';
import { EmailTemplateModel } from '../models/email-template.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';

@Injectable()
export class EmailTemplateService extends BaseService<EmailTemplateModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/EmailTemplate`;
    }
}
