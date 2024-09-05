import { AppointmentDraftNoteModel } from './../models/appointment-draft-note.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppointmentNoteModel } from '../models/appointment-note.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';

@Injectable()
export class AppointmentNoteService extends BaseService<AppointmentNoteModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentNote`;
    }

    CountAppointmentNote(appointmentId){
        let url = Global.apiUrl + `/api/Appointment/CountAppointmentNote/${appointmentId}`;
        return this.http.get(url) as Observable<number>;
    }

    SaveDraftNote(entity){
        let url = Global.apiUrl + `/api/AppointmentNote/SaveDraftNote`;
        return this.http.post(url,entity) as Observable<boolean>;
    }

    LoadDraftNote(appointmentId){
        let url = Global.apiUrl + `/api/AppointmentNote/LoadDraftNote/${appointmentId}`;
        return this.http.get(url) as Observable<AppointmentDraftNoteModel>;
    }
}
