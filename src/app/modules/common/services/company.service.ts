import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService extends BaseService<CompanyModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Company`;
  }

  CheckDiscountCode(code) {
    let url = `${Global.apiUrl}/api/Company/CheckDiscountCode?code=${code}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  GetById(id: string) {
    let url = Global.apiUrl + `/api/Company/GetById/${id}`;
    return this.httpClient.get(url) as Observable<CompanyModel>;
  }


  GetCurrentCompany(){
    let url = Global.apiUrl + `/api/Company/GetCurrentCompany`;
    return this.httpClient.get(url) as Observable<CompanyModel>;
  }


}
