import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Global from '../../../Global';
import { MessageChatModel } from '../models/message-chat.model';
import { RoomChatInfoViewModel } from '../models/room-chat-info-view.model';
import { UserContactModel } from '../models/user-contact-chat.model';
import { BaseService } from './base.service';
import { UserMessageChatModel } from '../models/user-message-chat.model';

@Injectable({
  providedIn: 'root'
})

export class AppChatService extends BaseService<UserContactModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/Chat`;
  }

  MarkedRead(roomId: string) {
    let url = Global.apiUrl + `/api/Chat/MarkedRead/${roomId}`;
    return this.http.post(url, null);
  }

  GetProviderContact() {
    let url = Global.apiUrl + `/api/Chat/GetProviderContactAndRooms`;
    return this.http.get(url) as Observable<UserContactModel[]>;
  }

  GetPatientContact() {
    let url = Global.apiUrl + `/api/Chat/GetPatientContact`;
    return this.http.get(url) as Observable<UserContactModel[]>;
  }

  GetMessages(roomId: string) {
    let url = Global.apiUrl + `/api/Chat/GetMessages/${roomId}`;
    return this.http.get(url) as Observable<MessageChatModel[]>;
  }

  CreateNewRoom() {
    let url = Global.apiUrl + `/api/Chat/CreateNewRoom`;
    return this.http.post(url, null) as Observable<string>;
  }

  GetRoomInfo(roomId: string) {
    let url = Global.apiUrl + `/api/Chat/GetRoomInfo/${roomId}`;
    return this.http.get(url) as Observable<RoomChatInfoViewModel>;
  }

  Download(key: string) {
    let url = Global.apiUrl + `/api/Chat/Download?key=${key}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  GetRooms() {
    let url = Global.apiUrl + `/api/Chat/GetRooms`;
    return this.http.get(url) as Observable<RoomChatInfoViewModel[]>;
  }

  GetLastestMessageStatusDate() {
    let url = Global.apiUrl + `/api/Chat/GetLastestMessageDate/`;
    return this.http.get(url) as Observable<Date>;
  }

  SendMessage(entity: UserMessageChatModel) {
    let url = Global.apiUrl + `/api/Chat/Send`;
    return this.http.post(url, entity) as Observable<MessageChatModel>;
  }

  DeleteRoom(roomId: any) {
    let url = Global.apiUrl + `/api/Chat/DeleteRoom/${roomId}`;
    return this.http.post(url, null) as Observable<boolean>;
  }

}