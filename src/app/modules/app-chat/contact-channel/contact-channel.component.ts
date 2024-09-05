import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { MessageChatModel } from '../../common/models/message-chat.model';
import { RoomChatInfoViewModel } from '../../common/models/room-chat-info-view.model';
import { AppChatService } from '../../common/services/app-chat.service';
import { AuthenticationService } from '../../common/services/authentication.service';
import { CommonDialogService } from '../../common/services/dialog.service';

@Component({
  selector: '[app-contact-channel]',
  templateUrl: './contact-channel.component.html',
  styleUrls: ['./contact-channel.component.css']
})
export class ContactChannelComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() room: RoomChatInfoViewModel;
  messageUnsubscribe: any;
  messageStatusUnscribe: any;
  totalUnread: number = 0;
  lastestDate: Date = new Date();
  messages: MessageChatModel[] = [];
  @Input() isPatient: boolean = false;

  constructor(authService: AuthenticationService,
    public fs: AngularFirestore,
    public appChatService: AppChatService,
    public dialog: CommonDialogService,
    public router: Router) {
    super(authService);
  }

  ngOnInit(): void {
    this.getLastestMessageDate();
  } 

  getMessageStore(roomId) {
    if (!roomId) return;
    this.fs.firestore.collection(this.FsMessageName)
      .where("RoomID", "==", roomId)
      .orderBy("SentDate", "asc")
      .get()
      .then((sn) => {
        var messages = [];
        sn.docs.forEach(doc => {
          var data = doc.data();
          data.SentDate = new Date(data.SentDate.seconds * 1000 + data.SentDate.nanoseconds / 1000000);
          messages.push(data);
        })
        this.messages = messages || []; 
      });
  }

  getLastestMessageDate() {
    this.appChatService.GetLastestMessageStatusDate().subscribe(r => {
      this.lastestDate = r;
      if (this.room && this.room.ID) {
        this.getTotalMessageUnRead();
        this.getMessageStore(this.room.ID);
        this.listernMessageRoom(); 
      }
    });
  }

  checkExistMessage(item) {
    return this.messages.find(x => x.ID == item.ID) != null;
  }


  selectRoom() {
    if (this.isPatient) {
      this.router.navigate(['../patient-messages/patient-main', this.room.ID])
    }
    else {
      this.router.navigate(['/app-chat/messages/main-chat', this.room.ID])
    }
  } 

  getTotalMessageUnRead() {
    if (this.room && this.room.ID) {
      this.fs.firestore
        .collection(this.FsMessageStatusName)
        .where("RoomID", "==", this.room.ID)
        .where("UserID", "==", this.currentUser.Id)
        .where("IsRead", "==", false)
        .get().then(sn => {
          this.totalUnread = sn.docs.length;
        });
    }
  }

  listernMessageRoom() {
    if (this.room && this.room.ID) {
      this.messageUnsubscribe = this.fs.firestore
        .collection(this.FsMessageName)
        .where("RoomID", "==", this.room.ID)
        .where("UserID", "!=", this.currentUser.Id)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
            var data = doc.data();
            var sentDate = new Date(data.SentDate.seconds * 1000 + data.SentDate.nanoseconds / 1000000);
            var lastesDate = new Date(this.lastestDate);
            if (sentDate >= lastesDate && !this.checkExistMessage(data)) {
              var message = Object.assign(new MessageChatModel(), data)
              message.SentDate = sentDate;
              this.messages.push(message); 
            }
          });
          this.getTotalMessageUnRead();
        });
    }
  }



  ngOnDestroy() {
    this.messageUnsubscribe != null && this.messageUnsubscribe();
    this.messageStatusUnscribe != null && this.messageStatusUnscribe();
  }
}
