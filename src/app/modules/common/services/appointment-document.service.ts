import { Injectable } from '@angular/core';
import { AppointmentDocumentModel } from '../models/appointment-document.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentDocumentService extends BaseService<AppointmentDocumentModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentDocument`;
    }

    Download(id) {
        let url = Global.apiUrl + `/api/AppointmentDocument/Download?id=${id}`;
        return this.http.post(url, {}) as Observable<string>;
    }

    RefreshFaxNotification(id) {
        let url = Global.apiUrl + `/api/AppointmentDocument/RefreshFaxNotification?id=${id}`;
        return this.http.post(url, {}) as Observable<boolean>;
    }

    GetByAppointmentId(id){
        let url = Global.apiUrl + `/api/AppointmentDocument/GetByAppointmentId/${id}`;
        return this.http.get(url) as Observable<AppointmentDocumentModel[]>;
    }

    FaxPDF(entity) {
        let url = Global.apiUrl + `/api/AppointmentDocument/FaxPDF`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GeneratePDFClinical(note){
        let url = Global.apiUrl + `/api/AppointmentDocument/GeneratePDFClinical`;
        return this.http.post(url,note) as Observable<boolean>;
    }

    GeneratePDF(appointmentId) {
        let url = Global.apiUrl + `/api/Appointment/GeneratePDF?id=${appointmentId}`;
        return this.httpClient.post(url, { id: appointmentId }) as Observable<boolean>;
    } 

}
