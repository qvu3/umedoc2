import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { GroupApptCategoryModel } from '../models/group-appt-category.model';
 import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupApptCategoryService  extends BaseService<GroupApptCategoryModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/GroupApptCategory`;
  }

  GetAll() {
    let url = Global.apiUrl + `/api/GroupApptCategory/GetAll`;
    return this.httpClient.get(url) as Observable<GroupApptCategoryModel[]>;
  }

} 