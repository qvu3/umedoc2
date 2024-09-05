import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/modules/common/component/change-password/change-password.component';
import { isPlatformBrowser } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: '[app-layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit, OnDestroy {
  stringChange: string = new Date().toJSON();
  isHideLayoutMain: boolean = false;
  newMessageStatusUnscribe: any;
  @ViewChild('changePassModal') changePassModal: ChangePasswordComponent;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    authService: AuthenticationService,
    private cdChange: ChangeDetectorRef,
    public idle: Idle,
    private dialog: CommonDialogService,
    public keepalive: Keepalive,
    private router: Router,
    private angularFireStore: AngularFirestore,
    private authFirestore: AngularFireAuth,
    private utilityService: UtilityService) {
    super(authService);
    this.isHideLayoutMain = false;
    authService.onChangePassword.subscribe(r => {
      this.changepassword();
    });
  }

  ngOnInit() {
    $('body').attr('class', 'horizontal-layout horizontal-menu 2-columns');
    $('body').attr('data-col', '2-column');
    this.utilityService.onNeedHideLayoutMain.subscribe(r => {
      this.isHideLayoutMain = r;
      this.cdChange.detectChanges();
      if (r) {
        $('body').attr('class', 'horizontal-layout horizontal-menu content-left-sidebar todo');
        $('body').attr('data-col', 'content-left-sidebar');
      }
      else {
        $('body').attr('class', 'horizontal-layout horizontal-menu 2-columns');
        $('body').attr('data-col', '2-column');
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      // Ide auto logout screen
      this.registerIdle(this.idle, this.keepalive, this.router)
    }
    this.loginFirestore();
  }

  loginFirestore(){
    this.authFirestore.signInWithEmailAndPassword(environment.firebaseUser , environment.firebasePassword)
    .then(r=>{
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
          this.authenticationService.totalMessageUnread = sn.docs.length;
          this.showNotificationNewMessage(sn).then(rooms => {
            rooms.forEach(room => {
              this.dialog.showToastrWarning(`Your have ${room.Total > 1 ? room.Total : ''} new message ${room.RoomName ? 'in ' + room.RoomName : ''}, please go to Chat to reply.`, () => {
                this.router.navigate(['/', 'app-chat', 'messages', 'main-chat', room.RoomID]);
              })
            });
          });
        })
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


  ngOnDestroy() {
    this.newMessageStatusUnscribe && this.newMessageStatusUnscribe();
  }


  changeMode(event) {
    this.stringChange = new Date().toJSON();
  }

  changepassword() {
    if (this.currentUser)
      this.changePassModal.show(this.currentUser.Id);
  }
}
