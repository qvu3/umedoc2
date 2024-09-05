import { Injectable } from '@angular/core';
import { ProviderEducationModel } from '../models/provider-education.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';

@Injectable()
export class ProviderEducationService extends BaseService<ProviderEducationModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderEducation`;
    }
}
