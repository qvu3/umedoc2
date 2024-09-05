import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global'; 
import { Observable } from 'rxjs';
import { ProviderStorage } from '../models/provider-storage.model';

@Injectable()
export class ProviderStorageService extends BaseService<ProviderStorage>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderStorage`;
    }

    Download(id) {
        let url = Global.apiUrl + `/api/ProviderStorage/Download/${id}`;
        return this.httpClient.get(url, { observe: 'response', responseType: 'blob' });
    }

    View(id) {
        let url = Global.apiUrl + `/api/ProviderStorage/View/${id}`;
        return this.httpClient.get(url) as Observable<string>;
    }

    
    ProviderStorageShareUrl(entity){
        let url = Global.apiUrl + `/api/ProviderStorage/ProviderStorageShareUrl`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

   
}
