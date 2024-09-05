import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RoleConstants } from 'src/app/Global';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../../base.component';
import { MessageConstant } from '../../common/constant/message.const';
import { MessageChatModel } from '../../common/models/message-chat.model';
import { RoomChatInfoViewModel } from '../../common/models/room-chat-info-view.model';
import { UserMessageChatModel } from '../../common/models/user-message-chat.model';
import { AppChatService } from '../../common/services/app-chat.service';
import { AuthenticationService } from '../../common/services/authentication.service';
import { CommonDialogService } from '../../common/services/dialog.service';
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent extends BaseComponent implements OnInit, OnDestroy {
  roomId: string;
  roomInfo: RoomChatInfoViewModel;
  messageUnsubscribe: any;
  content: UserMessageChatModel = new UserMessageChatModel();
  messages: MessageChatModel[] = [];
  lastestDate: Date = new Date();
  perfectScroll: any;
  isUploading: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    authService: AuthenticationService,
    activeRouter: ActivatedRoute,
    private fs: AngularFirestore,
    private authStore: AngularFireAuth,
    private router: Router,
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef,
    private chatService: AppChatService) {
    super(authService);
    activeRouter.params.subscribe(r => {
      this.roomId = this.authenticationService.currentRoomId = r['roomId'];
      this.getRoomInfo(this.roomId);
      this.getMessageStore(this.roomId);
      this.init(this.roomId);
    });
  }

  ngOnInit(): void {

  }

  uploadStatus(message) {
    if (message) {
      message.RoomID = message.RoomID;
      message.UserID = this.currentUser.Id;
      message.SentDate = new Date(moment().utc().format());
      message.isSending = true;
      message.ProfilePicture = this.currentUser.ProfilePicture;
      message.ProfilePicture = this.currentUser.ProfilePicture;
      message.IsFile = true;
      message.IsProvider = this.currentUser.Role != RoleConstants.Patient;
      message.Sender = `${this.currentUser.FirstName} ${this.currentUser.LastName}`;

      this.messages.push(message);
      this.scrollToBottom();
    }
  }

  uploaded(returnObject) {
    if (returnObject && returnObject.ID) {
      var message = this.messages.find(x => x.ID == returnObject.ID);
      if (message) {
        message.isSending = false;
        message.Path = returnObject.Path;
        message.MineType = returnObject.MineType;
        message.IsProvider = returnObject.IsProvider;
        message.Sender = returnObject.Sender;
      }
    }
  }

  errorUploaded(messageId) {
    var index = this.messages.findIndex(x => x.ID == messageId);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

  init(roomId) {
    this.content = new UserMessageChatModel();
    this.content.RoomID = roomId;
    this.content.Message = "";
    this.content.UserId = this.currentUser.Id;
  }

  getLastestMessageDate() {
    this.chatService.GetLastestMessageStatusDate().subscribe(r => {
      this.lastestDate = r;
      if (this.roomId) {
        this.getRoomInfo(this.roomId);
      }
    });
  }

  // getMessages(roomId) {
  //   if (!roomId) return;
  //   this.chatService.GetMessages(roomId).subscribe(r => {
  //     this.messages = r || [];
  //     this.scrollToBottom();
  //     this.markedChat();
  //   });
  // }

  getMessageStore(roomId) {
    var today = new Date(moment().utc().format());;
    var from = new Date(moment(today).add(- 7, 'days').format());
    if (!roomId) return;
    this.blockUI.start();
    this.authStore.signInWithEmailAndPassword(environment.firebaseUser, environment.firebasePassword).then(r => {

      this.fs.firestore.collection(this.FsMessageName)
        .where("RoomID", "==", roomId)
        .where("SentDate", ">=", from)
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
          this.cdChanged.detectChanges();
          this.scrollToBottom();
          this.markedChat();
          this.blockUI.stop();
        }, () => {
          this.blockUI.stop();
        });

    }, () => {
      this.blockUI.stop();
    });
  }

  chatMessagesSend() {
    if (!this.content || !this.content.Message || !this.content.Message.trim()) return;
    var message = Object.assign({}, this.content);
    message.ID = this.uuidv4();

    this.content.Message = "";
    var tempMessage = new MessageChatModel();
    tempMessage.ID = message.ID;
    tempMessage.Content = message.Message;
    tempMessage.RoomID = message.RoomID;
    tempMessage.UserID = this.currentUser.Id;
    tempMessage.SentDate = new Date(moment().utc().format());
    tempMessage.isSending = true;
    tempMessage.IsFile = false;
    tempMessage.ProfilePicture = this.currentUser.ProfilePicture;
    tempMessage.IsProvider = this.currentUser.Role != RoleConstants.Patient;
    tempMessage.Sender = `${this.currentUser.FirstName} ${this.currentUser.LastName}`;
    this.messages.push(tempMessage);

    this.chatService.SendMessage(message).subscribe(r => {
      this.scrollToBottom();
      this.markedChat();
    });
  }

  markedChat() {
    if (this.roomId) {
      this.chatService.MarkedRead(this.roomId).subscribe();
    }
  }
  scrollToTop() {
    setTimeout(() => {
      var element = $(".chat-container");
      if (element && element[0]) {
        element.scrollTop(0);
      }
    }, 100);
  }


  scrollToBottom() {
    this.scrollToTop();
    setTimeout(() => {
      var element = $(".chat-container");
      if (element && element[0]) {
        element.scrollTop(0);
        element.scrollTop(element[0].scrollHeight);
      }
    }, 800);
  }

  checkExistMessage(item) {
    return this.messages.find(x => x.ID == item.ID) != null;
  }

  listernMessageRoom() {
    if (this.roomId) {
      this.messageUnsubscribe = this.fs.firestore
        .collection(this.FsMessageName)
        .where("RoomID", "==", this.roomId)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
            var data = doc.data();
            var sentDate = new Date(data.SentDate.seconds * 1000 + data.SentDate.nanoseconds / 1000000);
            var lastesDate = new Date(this.lastestDate);
            if (sentDate >= lastesDate) {
              this.addMessage(data);
            }
          });
        });
    }
  }

  addMessage(data) {
    var sentDate = new Date(data.SentDate.seconds * 1000 + data.SentDate.nanoseconds / 1000000);
    var message = this.messages.find(x => x.ID == data.ID);
    var participant = this.roomInfo?.Participants?.find(x => x.ID == data.ParticipantID);
    if (message) {
      if (message.isSending) {
        message.Content = data.Content;
        message.ParticipantID = data.ParticipantID;
        message.RoomID = data.RoomID;
        message.SentDate = sentDate;
        message.UserID = data.UserID;
        message.ProfilePicture = participant?.ProfilePicture;
        message.isSending = false;
        message.IsFile = data.IsFile ?? false;
        message.IsProvider = data.IsProvider;
        message.MineType = data.MineType;
        message.Sender = data.Sender;
      }
    }
    else {
      var message = new MessageChatModel();
      message.ID = data.ID;
      message.Content = data.Content;
      message.ParticipantID = data.ParticipantID;
      message.RoomID = data.RoomID;
      message.SentDate = sentDate;
      message.UserID = data.UserID;
      message.ProfilePicture = participant?.ProfilePicture;
      message.IsFile = data.IsFile ?? false;
      message.MineType = data.MineType;
      message.IsProvider = data.IsProvider;
      message.Sender = data.Sender;
      message.Path = data.Path;
      
      this.messages.push(message);
      this.scrollToBottom();
    }
  }

  getRoomInfo(roomId) {
    if (roomId) {
      this.chatService.GetRoomInfo(roomId).subscribe(r => {
        if (r) {
          this.roomInfo = r;
          this.listernMessageRoom();
        }
        else {
          this.router.navigate(['/app-chat/messages/empty-chat']);
        }
      });
    }
  }



  deleteRoomInfo(roomId) {
    if (roomId) {
      this.dialog.showSwalConfirmAlert('Delete this item?').then(r => {
        if (r) {
          this.chatService.DeleteRoom(roomId).subscribe(r => {
            if (r) {
              this.dialog.showToastrSuccess('Delete Room', MessageConstant.REQUEST_SUCCESS_CONST);
              this.authenticationService.onReloadGetRoomsChat.emit(true);
              this.router.navigate(['/app-chat/messages/empty-chat']);
            } else {
              this.dialog.showSwalErrorAlert('Delete Room', 'This room  is using by other.');
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Delete Room', 'This room  is using by other.');
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.messageUnsubscribe != null && this.messageUnsubscribe();
  }

}
