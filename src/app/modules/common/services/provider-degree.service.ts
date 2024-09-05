import { Injectable } from '@angular/core';
import { ProviderDegreeModel } from '../models/provider-degree.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderDegreeService extends BaseService<ProviderDegreeModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderDegree`;
    }


    GetAll(){
        let url  = `${this.resource}/GetAll`;
        return  this.http.get(url) as Observable<ProviderDegreeModel[]>;
    }
}
