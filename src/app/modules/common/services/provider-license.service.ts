import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';
import { ProviderLicenseModel } from '../models/provider-license.model';

@Injectable()
export class ProviderLicenseService extends BaseService<ProviderLicenseModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderLicense`;
    }

    SearchAsync(criteria: any) {
        let url = Global.apiUrl + `/api/ProviderLicense/SearchAsync`;
        return this.httpClient.post(url, criteria) as Observable<ProviderLicenseModel[]>;
    }
}
