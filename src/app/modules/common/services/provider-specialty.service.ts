import { Injectable } from '@angular/core';
import { ProviderSpecialtyModel } from '../models/provider-specialty.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderSpecialtyService extends BaseService<ProviderSpecialtyModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderSpecialty`;
    }

    GetAll(){
        let url  = `${this.resource}/GetAll`;
        return  this.http.get(url) as Observable<ProviderSpecialtyModel[]>;
    }
}
