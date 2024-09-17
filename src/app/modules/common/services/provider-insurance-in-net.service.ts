import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { ProviderInsuranceInNetModel } from '../models/provider-insurance-in-net.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderInsuranceInNetService extends BaseService<ProviderInsuranceInNetModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/ProviderInsuranceInNet`;
  }

  GetByProvider(userID: string) {
      let url = Global.apiUrl + `/api/ProviderInsuranceInNet/GetByProvider/${userID}`;
      return this.httpClient.get(url) as Observable<ProviderInsuranceInNetModel[]>;
  }
}