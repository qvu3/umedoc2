import { Injectable } from '@angular/core';
import { SRFaxDetailModel } from '../models/srfax-detail.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';

@Injectable()
export class SRFaxDetailService extends BaseService<SRFaxDetailModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/SRFaxDetail`;
    }
}
