import { Injectable } from '@angular/core';
import { ProviderBadgeModel } from '../models/provider-badge.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderBadgeService extends BaseService<ProviderBadgeModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderBadge`;
    }

    GetByProviderID(id: any){
        let url  = `${this.resource}/GetByProviderID/${id}`;
        return  this.http.get(url) as Observable<string[]>;
    }
}
