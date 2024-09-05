import { RoleConstants } from 'src/app/Global';
import { TicketService } from './../../../common/services/ticket.service';
import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/modules/common/component/change-password/change-password.component';
import { isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { environment } from 'src/environments/environment';
import { PatientInviteModalComponent } from '../patient-profile-new/patient-invite-modal/patient-invite-modal.component';
import { GroupApptPatientService } from 'src/app/modules/common/services/group-appt-patient.service';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit, OnDestroy {
  stringChange: string = new Date().toJSON();
  isPatientProfilePage: boolean = false;
  @ViewChild('changePassModal') changePassModal: ChangePasswordComponent;
  @ViewChild('inviteUserModal') inviteUserModal: PatientInviteModalComponent;
  isDesktop: boolean = true;
  title: string = '';
  totalBalanceBilling: number = 0;
  newMessageStatusUnscribe: any;
  totalAppt: number = 0;
  totalGroupAppt: number = 0;
  totalTicketWaiting : number = 0 ;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthenticationService,
    public idle: Idle,
    public keepalive: Keepalive,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private insuranceBalanceService: BalanceBillingService,
    private angularFireStore: AngularFirestore,
    private authFirestore: AngularFireAuth,
    private dialog: CommonDialogService,
    private cdChanged: ChangeDetectorRef,
    private appointmentService: AppointmentService,
    private ticketService:TicketService,
    private groupApptPatientService: GroupApptPatientService) {
    super(authService);
    this.authService.onChangePassword.subscribe(r => {
      this.changepassword();
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const child = this.activeRouter.firstChild;
        if (child.snapshot.data['title']) {
          this.title = child.snapshot.data['title'];
        }
        setTimeout(() => {
          this.checkPatientUrl(event.urlAfterRedirects);
          this.countBalanceBilling();
        }, 300);
      }
    });
    this.isDesktop = this.deviceService.isDesktop();

    // get count data 
    this.getNumberAppointmentOfPatient();
    this.getNumberGroupApptOfPatient(); 
  }

  loginFirestore() {
    this.authFirestore.signInWithEmailAndPassword(environment.firebaseUser, environment.firebasePassword)
      .then(r => {
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
              this.dialog.showToastrWarning(`Your have ${room.Total > 1 ? room.Total : ''} new message ${room.RoomName ? 'in ' + room.RoomName : ''}.`, () => {
                this.router.navigate(['/patient-messages/patient-main', room.RoomID]);
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

  registerMenuColapse() {
    setTimeout(() => {
      $(".btn.border.rounded-pill").unbind('click');
      $(".btn.border.rounded-pill").bind('click', () => {
        if (!this.isDesktop) {
          $('#sidebarCollapse').click();
        }
      });
    }, 300);
  }

  checkPatientUrl(url) {
    this.isPatientProfilePage =
      (url.indexOf('/patient-profile') >= 0
        || url.indexOf('/patient-prescription') >= 0
        || url.indexOf('/patient-history') >= 0
        || url.indexOf('/patient-credit-card') >= 0
        || url.indexOf('/patient-prefer-pharmacy') >= 0
        || url.indexOf('/patient-my-profile') >= 0)
      || url.indexOf('/patient-insurance') >= 0
      || url.indexOf('/patient-storage') >= 0
      || url.indexOf('/patient-app-chat') >= 0
      || url.indexOf('/billings') >= 0
      || url.indexOf('/patient-messages') >= 0
      || url.indexOf('/patient-children') >= 0 
      || url.indexOf('/patient-tickets') >= 0
       || url.indexOf('/patient-ticket-detail') >=0;
  }

  ngOnInit() {
    $('body').attr('class', 'horizontal-layout horizontal-menu 2-columns chat-application');
    $('body').attr('data-col', '2-column');

    setTimeout(function () {
      $("body").removeClass("fixed-navbar");
      this.registerToggleMenu();
    }.bind(this), 500);

    if (isPlatformBrowser(this.platformId)) {
      // Ide auto logout screen
      this.registerIdle(this.idle, this.keepalive, this.router)
    }
    this.registerMenuColapse();
    this.loginFirestore();
  }

  changeMode(event) {
    this.stringChange = new Date().toJSON();
  }

  changepassword() {
    if (this.currentUser)
      this.changePassModal.show(this.currentUser.Id);
  }

  signOut() {
    this.authService.SignOut();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.newMessageStatusUnscribe) {
      this.newMessageStatusUnscribe();
    }
  }

  countBalanceBilling() {
    if (this.currentUser) {
      this.insuranceBalanceService.countBalanceBilling().subscribe(r => {
        this.totalBalanceBilling = r;
      })
    }
  }

  getNumberAppointmentOfPatient() {
    if (this.currentUser) {
      this.appointmentService.GetNumberAppointmentOfPatient().subscribe(r => {
        this.totalAppt = r;
      })
    }
  }

  getNumberGroupApptOfPatient() {
    this.groupApptPatientService.GetNumberGroupApptOfPatient().subscribe(r => {
      this.totalGroupAppt = r;
    });
  } 

  caculateGroupApptPatient() {
     return this.totalAppt + this.totalGroupAppt;
  }

  registerToggleMenu() {
    $('#navbarNav').off('click');
    $('#navbarNav .nav-link').on('click', () => {
      $('#toggleMenuMobilePatient').click();
    });
  }

  invitePatientUser() {
    this.inviteUserModal.show(this.currentUser.Id);
  }
}
