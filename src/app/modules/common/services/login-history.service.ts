import { Injectable } from '@angular/core';
import { LoginHistoryModel } from '../models/login-history.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Injectable()
export class LoginHistoryService extends BaseService<LoginHistoryModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/LoginHistory`;
    }
}
