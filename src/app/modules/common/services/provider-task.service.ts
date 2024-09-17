import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';
import ProviderTaskModel from '../models/provider-task.model';

@Injectable()
export class ProviderTaskService extends BaseService<ProviderTaskModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/ProviderTask`;
  }

  SearchAsync(criteria: any) {
    let url = Global.apiUrl + `/api/ProviderTask/SearchAsync`;
    return this.httpClient.post(url, criteria) as Observable<ProviderTaskModel[]>;
  }

  ChangeStatusProviderTask(id: any, status: any) {
    let url = Global.apiUrl + `/api/ProviderTask/ChangeStatusProviderTask/${id}/${status}`;
    return this.httpClient.post(url, null) as Observable<boolean>;
  }

  CountTotalTaskListTodoByPatientAsync(id: any) {
    let url = Global.apiUrl + `/api/ProviderTask/CountTotalTaskListTodoByPatientAsync/${id}`;
    return this.httpClient.post(url, null) as Observable<number>;
  }

  CountTotalTaskListTodoAssigneeAsync(id: any) {
    let url = Global.apiUrl + `/api/ProviderTask/CountTotalTaskListTodoAssigneeAsync/${id}`;
    return this.httpClient.post(url, null) as Observable<number>;
  }
}
