import { Injectable } from '@angular/core';
import { ProviderRoleModel } from '../models/provider-role.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderRoleService extends BaseService<ProviderRoleModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderRole`;
    }

    GetAll(){
        let url  = `${this.resource}/GetAll`;
        return  this.http.get(url) as Observable<ProviderRoleModel[]>;
    }
}
