import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { DocumentTemplateModel } from '../models/document-template.model';
import { Observable } from 'rxjs';
import SignatureDocumentModel from '../models/signature-document.model';

@Injectable()
export class DocumentTemplateService extends BaseService<DocumentTemplateModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/DocumentTemplate`;
    }

    GetByTemplateName(templateName: string, appointmentId: string) {
        let url = Global.apiUrl + `/api/DocumentTemplate/GetByTemplateName/${templateName}/${appointmentId}`;
        return this.httpClient.get(url) as Observable<SignatureDocumentModel>;
    }
}
