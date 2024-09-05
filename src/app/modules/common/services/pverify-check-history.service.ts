import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Global from 'src/app/Global'; 
import { BaseService } from './base.service';
import {PverifyCheckHistoryModel} from 'src/app/modules/common/models/pverify-check-history.model'
@Injectable({
  providedIn: 'root'
})
export class PverifyCheckHistoryService extends BaseService<PverifyCheckHistoryModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/PverifyCheckHistory`;
  }

}
