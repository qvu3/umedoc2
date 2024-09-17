import { Injectable } from '@angular/core';
import { AppointmentImageModel } from '../models/appointment-image.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';

@Injectable()
export class AppointmentImageService extends BaseService<AppointmentImageModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentImage`;
    }
}
