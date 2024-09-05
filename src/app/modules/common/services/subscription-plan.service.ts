import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from 'src/app/Global'; 
import { SubscriptionPlanModel } from '../models/subscription-plan.model';
 import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService extends BaseService<SubscriptionPlanModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/SubscriptionPlan`;
  }
 
  GetAll() {
    let url = Global.apiUrl + `/api/SubscriptionPlan/GetAll`;
    return this.httpClient.get(url) as Observable<SubscriptionPlanModel[]>;
  }

  GetById(id) {
    let url = Global.apiUrl + `/api/SubscriptionPlan/GetById/${id}`;
    return this.httpClient.get(url) as Observable<SubscriptionPlanModel>;
  } 
}
