import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { PatientStorage } from '../models/patient-storage.model';
import { Observable } from 'rxjs';

@Injectable()
export class PatientStorageService extends BaseService<PatientStorage>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientStorage`;
    }

    Download(id) {
        let url = Global.apiUrl + `/api/PatientStorage/Download/${id}`;
        return this.httpClient.get(url, { observe: 'response', responseType: 'blob' });
    }

    View(id) {
        let url = Global.apiUrl + `/api/PatientStorage/View/${id}`;
        return this.httpClient.get(url) as Observable<string>;
    }

    SaveWorkReleasePDF(signatureDocument) {
        let url = Global.apiUrl + `/api/PatientStorage/SaveWorkReleasePDF`;
        return this.httpClient.post(url, signatureDocument) as Observable<boolean>;
    }

    PatientStorageShareUrl(entity){
        let url = Global.apiUrl + `/api/PatientStorage/PatientStorageShareUrl`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    SaveLabOrderPDF(labOrderDocument) {
        let url = Global.apiUrl + `/api/PatientStorage/SaveLabOrderPDF`;
        return this.httpClient.post(url, labOrderDocument) as Observable<boolean>;
    }
}
