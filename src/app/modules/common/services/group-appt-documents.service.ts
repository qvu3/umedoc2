
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { GroupApptDocumentsModel } from '../models/group-appt-documents.model';

@Injectable()
export class GroupApptDocumentsService extends BaseService<GroupApptDocumentsModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/GroupApptDocuments`;
    }

    Download(id) {
        let url = Global.apiUrl + `/api/GroupApptDocuments/Download?id=${id}`;
        return this.httpClient.get(url, { observe: 'response', responseType: 'blob' });
    }
 
    GetDocumentsByGroupApptID(id){
        let url = Global.apiUrl + `/api/GroupApptDocuments/GetDocumentsByGroupApptID/${id}`;
        return this.http.get(url) as Observable<GroupApptDocumentsModel[]>;
    } 

    View(id) {
        let url = Global.apiUrl + `/api/GroupApptDocuments/View/${id}`;
        return this.httpClient.get(url) as Observable<string>;
    }
}
