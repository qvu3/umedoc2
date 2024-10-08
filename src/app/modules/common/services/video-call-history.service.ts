import { Injectable } from '@angular/core';
import { VideoCallHistoryModel } from '../models/video-call-history.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';

@Injectable()
export class VideoCallHistoryService extends BaseService<VideoCallHistoryModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/VideoCallHistory`;
    }

    GetByAppointmentID(id: any) {
        let url = `${this.resource}/GetByAppointmentID/${id}`;
        return this.http.get(url) as Observable<string[]>;
    }
}
