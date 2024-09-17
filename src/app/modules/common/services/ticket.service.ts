import { Observable } from 'rxjs';
import { TicketModel } from './../models/ticket.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { TicketMessageModel } from '../models/ticket-message.model';
import UserModel from '../models/user.model';
import { TicketType } from '../constant/message.const';

@Injectable()
export class TicketService extends BaseService<TicketModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/Ticket`;
    }

    GetPatientUsers(){
        let url = Global.apiUrl + `/api/Ticket/GetPatientUsers`;
        return this.httpClient.get(url) as Observable<UserModel[]>;
    }

    GetTotalWaiting() {
        let url = Global.apiUrl + `/api/Ticket/GetTotalWaiting`;
        return this.httpClient.get(url) as Observable<number>;
    }

    CreateMessage(ticketMessage: TicketMessageModel) {
        let url = Global.apiUrl + `/api/Ticket/CreateMessage`;
        return this.httpClient.post(url, ticketMessage) as Observable<boolean>;
    }

    GetMessages(ticketId: string) {
        let url = Global.apiUrl + `/api/Ticket/GetMessages/${ticketId}`;
        return this.httpClient.get(url) as Observable<TicketMessageModel[]>;

    }

    UpdateCategoryTicket(ticketId: string, ticketType: TicketType) {
        let url = Global.apiUrl + `/api/Ticket/UpdateCategoryTicket/${ticketId}/${ticketType}`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }

    DeleteMessage(ticketMessageId: any) {
        let url = Global.apiUrl + `/api/Ticket/DeleteMessage/${ticketMessageId}`;
        return this.httpClient.delete(url) as Observable<boolean>;
    }

    View(key: string) {
        let url = Global.apiUrl + `/api/Ticket/View?key=${key}`;
        return this.http.get(url) as Observable<string>;
    }

}
