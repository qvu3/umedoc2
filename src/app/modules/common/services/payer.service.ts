import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from 'src/app/Global';
import { PayerModel } from '../models/payer.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PayerService extends BaseService<PayerModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/PVerifyPayerList`;
  }

  GetAll() {
    let url = Global.apiUrl + `/api/PVerifyPayerList/GetAll`;
    return this.httpClient.get(url) as Observable<PayerModel[]>;
  }

}
