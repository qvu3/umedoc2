import { Injectable } from '@angular/core';
import { AppointmentDocumentModel } from '../models/appointment-document.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { ProviderGroupModel } from '../models/provider-group.model';
import { ProviderGroupAssignmentModel } from '../models/provider-group-assignment.model';
import UserModel from '../models/user.model';

@Injectable()
export class ProviderGroupService extends BaseService<ProviderGroupModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/ProviderGroup`;
    } 

    GetAssigned(groupId){
        let url = `${this.resource}/GetAssigned/${groupId}`;
        return this.http.get(url) as Observable<ProviderGroupAssignmentModel[]>;
    }
    
    AddAssign(entity){
        let url = `${this.resource}/AddAssign`;
        return this.http.post(url,entity) as Observable<boolean>; 
    }

    DeleteAssign(id){
        let url = `${this.resource}/DeleteAssign/${id}`;
        return this.http.delete(url) as Observable<boolean>; 
    }

    GetProviders(groupId){
        let url = `${this.resource}/GetProviders/${groupId}`;
        return this.http.get(url) as Observable<UserModel[]>;
    }

}
