import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Global from 'src/app/Global';
import { PageViewHistoryModel } from '../models/page-view-history.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PageViewHistoryService extends BaseService<PageViewHistoryModel>{
  constructor(public http: HttpClient) {
      super(http);
      this.resource = `${Global.apiUrl}/api/PageViewHistory`;
  }
}
