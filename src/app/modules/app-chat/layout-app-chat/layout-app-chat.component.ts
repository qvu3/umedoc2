import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BaseComponent } from '../../base.component';
import { ChangePasswordComponent } from '../../common/component/change-password/change-password.component';
import { RoomChatInfoViewModel } from '../../common/models/room-chat-info-view.model';
import { UserContactModel } from '../../common/models/user-contact-chat.model';
import { AppChatService } from '../../common/services/app-chat.service';
import { AuthenticationService } from '../../common/services/authentication.service';
import { CommonDialogService } from '../../common/services/dialog.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-layout-app-chat',
  templateUrl: './layout-app-chat.component.html',
  styleUrls: ['./layout-app-chat.component.css']
})
export class LayoutAppChatComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('changePassModal') changePassModal: ChangePasswordComponent;
  contacts: UserContactModel[] = [];
  rooms: RoomChatInfoViewModel[] = [];
  newMessageStatusUnscribe: any;
  currentRoomId: string;
  currentYear: number;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private angularFireStore: AngularFirestore,
    private authService: AuthenticationService,
    public idle: Idle,
    public keepalive: Keepalive,
    public dialog: CommonDialogService,
    private appChatService: AppChatService,
    private authFirestore: AngularFireAuth,
    activeRouter: ActivatedRoute,
    private router: Router) {
    super(authService);
    this.currentYear = new Date().getFullYear();
    authService.onReloadGetRoomsChat.subscribe(r => {
      this.getRooms();
    });

  }

  ngOnInit(): void {

    $('body').attr('class', 'horizontal-layout content-left-sidebar chat-application pace-done menu-expanded horizontal-menu');
    $('body').attr('data-col', 'content-left-sidebar');

    setTimeout(function () {
      $("body").removeClass("fixed-navbar");
    }, 500);

    if (isPlatformBrowser(this.platformId)) {
      // Ide auto logout screen
      this.registerIdle(this.idle, this.keepalive, this.router)
    }

    this.getRooms();
    this.loginFirestore();
  }

  loginFirestore() {
    this.authFirestore.signInWithEmailAndPassword(environment.firebaseUser, environment.firebasePassword).then(r => {
      this.registerNewMessage();
    });
  }

  registerNewMessage() {
    if (this.currentUser) {
      this.newMessageStatusUnscribe = this.angularFireStore.firestore
        .collection(this.FsMessageStatusName)
        .where("UserID", "==", this.currentUser.Id)
        .where("IsRead", "==", false)
        .onSnapshot(sn => {
          this.authService.totalMessageUnread = sn.docs.length;
          this.showNotificationNewMessage(sn).then(rooms => {
            rooms.forEach(room => {
              this.reloadNewRoom(room);
              this.dialog.showToastrWarning(`Your have ${room.Total > 1 ? room.Total : ''} new message ${room.RoomName ? 'in ' + room.RoomName : ''}.`, () => {
                this.router.navigate(['/app-chat/messages/main-chat', room.RoomID]);
              })
            });
          });
        })
    }
  }

  reloadNewRoom(room) {
    var existedRoom = this.rooms.find(x => x.ID == room.RoomID);
    if (!existedRoom) {
      this.getRooms();
    }
  }

  async showNotificationNewMessage(sn) {
    var rooms = [];
    sn.docs.forEach(async (element) => {
      var data = element.data();
      if (data) {
        var room = rooms.find(x => x.RoomID == data.RoomID);
        if (!room) {
          room = { RoomID: data.RoomID, Total: 1, RoomName: data.RoomName };
          rooms.push(room);
        }
        else {
          room.Total += 1;
        }
      }
    });
    return rooms;
  }

  changepassword() {
    if (this.currentUser)
      this.changePassModal.show(this.currentUser.Id);
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['/']);
  }

  getRooms() {
    this.appChatService.GetRooms().subscribe(r => {
      this.rooms = r;
    });
  }

  ngOnDestroy() {
    this.newMessageStatusUnscribe && this.newMessageStatusUnscribe();
  }


}