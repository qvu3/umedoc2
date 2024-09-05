
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { MessageChatModel } from '../../common/models/message-chat.model';
import { RoomChatInfoViewModel } from '../../common/models/room-chat-info-view.model';
import { UserContactModel } from '../../common/models/user-contact-chat.model';
import { AppChatService } from '../../common/services/app-chat.service';
import { AuthenticationService } from '../../common/services/authentication.service';
import { CommonDialogService } from '../../common/services/dialog.service';
declare var moment: any;
@Component({
  selector: '[app-contact-room]',
  templateUrl: './contact-room.component.html',
  styleUrls: ['./contact-room.component.css'],
})
export class ContactRoomComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() user: UserContactModel = new UserContactModel();
  @Input() isPatient: boolean = false;
  @Output() onNewRoom:EventEmitter<boolean> = new EventEmitter();
  newRoomUnsubscribe: any;
  messageUnsubscribe: any;
  messageStatusUnscribe: any;
  totalUnread: number = 0;
  roomInfo: RoomChatInfoViewModel = new RoomChatInfoViewModel();
  lastestDate: Date = new Date();
  messages: MessageChatModel[] = [];
  constructor(authService: AuthenticationService,
    public fs: AngularFirestore,
    public appChatService: AppChatService,
    public dialog: CommonDialogService,
    public router: Router) {
    super(authService);
  }

  override ngOnInit(): void {
    this.getLastestMessageDate();
  }

  getMessages(roomId: string | null) {
    if (!roomId) return;
    this.appChatService.GetMessages(roomId).subscribe(r => {
      this.messages = r || [];
    });
  }

  getLastestMessageDate() {
    this.appChatService.GetLastestMessageStatusDate().subscribe(r => {
      this.lastestDate = r;
      if (this.user && !this.user.RoomID) {
        this.listernNewRoom();
        this.getRoomInfo(this.user.RoomID);
        this.getTotalMessageUnRead();
        this.getMessages(this.user.RoomID);
      }
    });
  }

  checkExistMessage(item: { [x: string]: any; ID?: any; }) {
    return this.messages.find(x => x.ID == item.ID) != null;
  }
  getRoomInfo(roomId: string | null) {
    if (!roomId) return;
    this.appChatService.GetRoomInfo(roomId).subscribe(r => {
      this.roomInfo = r;
    });
  }

  selectContact(contact: UserContactModel) {
    if (!contact.RoomID) {
      
    }
    else {
      this.listernMessageRoom();
      this.listernMessageStatusUnRead();
      if (this.isPatient) {
        this.router.navigate(['../patient-messages/patient-main', contact.RoomID])
      }
      else {
        this.router.navigate(['/app-chat/messages/main-chat', contact.RoomID])
      }
    }
  }

  listernMessageStatusUnRead() {
    if (this.user && this.user.RoomID) {
      this.messageStatusUnscribe = this.fs.firestore
        .collection(this.FsMessageStatusName)
        .where("RoomID", "==", this.user.RoomID)
        .where("UserID", "==", this.currentUser.Id)
        .where("IsRead", "==", false)
        .onSnapshot(sn => {
          this.totalUnread = 0;
          sn.docs.forEach(doc => {
            this.totalUnread++;
          });
        });
    }
  }

  getTotalMessageUnRead() {
    if (this.user && this.user.RoomID) {
      this.fs.firestore
        .collection(this.FsMessageStatusName)
        .where("RoomID", "==", this.user.RoomID)
        .where("UserID", "==", this.currentUser.Id)
        .where("IsRead", "==", false)
        .get().then(sn => {
          this.totalUnread = 0;
          sn.docs.forEach(doc => {
            this.totalUnread++;
          });
        });
    }
  }

  listernMessageRoom() {
    if (this.user && this.user.RoomID) {
      this.messageUnsubscribe = this.fs.firestore
        .collection(this.FsMessageName)
        .where("RoomID", "==", this.user.RoomID)
        .where("UserID", "!=", this.currentUser.Id)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
            var data = doc.data();
            var sentDate = new Date(data['SentDate'].seconds * 1000 + data['SentDate'].nanoseconds / 1000000);
            var lastesDate = new Date(this.lastestDate);
            if (sentDate >= lastesDate && !this.checkExistMessage(data)) {
              var message = Object.assign(new MessageChatModel(), data)
              message.SentDate = sentDate;
              this.messages.push(message);
              var participant = this.roomInfo?.Participants?.find(x => x.ID == data['ParticipantID']);
              if (participant) {
                this.dialog.showToastrWarning(`You have a message from ${participant.Name}` , ()=>{
                  this.router.navigate(['/', 'app-chat', 'messages' , 'main-chat', this.roomInfo.ID]);
                });
              }
            }
          });
          this.getTotalMessageUnRead();
        });
    }
  }

  listernNewRoom() {
    this.newRoomUnsubscribe = this.fs.firestore
      .collection(this.FsRoomName)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          var data = doc.data();
          if (data['Participants'] && data['Participants'].length >= 2) {
            var list = data['Participants'].filter((x: string) => x == this.currentUser.Id || x == this.user.UserId);
            if (list && list.length >= 2) {
              this.user.RoomID = data['ID'];
              this.onNewRoom.emit(true);
              this.getRoomInfo(data['ID']);
              this.getMessages(data['ID']);
              this.newRoomUnsubscribe();
              this.listernMessageRoom();
              this.listernMessageStatusUnRead();
            }
          }
        });
      });
  }

  ngOnDestroy() {
    this.newRoomUnsubscribe != null && this.newRoomUnsubscribe();
    this.messageUnsubscribe != null && this.messageUnsubscribe();
    this.messageStatusUnscribe != null && this.messageStatusUnscribe();
  }
}
