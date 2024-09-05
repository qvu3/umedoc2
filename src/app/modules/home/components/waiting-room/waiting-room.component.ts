import { Component, OnInit, ViewChild, OnDestroy, SkipSelf } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppointmentService } from '../../../common/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { BaseComponent } from '../../../base.component';
import { PrmcHub } from '../../../common/services/prmc-hub';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { ProviderProfileComponent } from '../request-appointment/provider-profile/provider-profile.component';
import { DomSanitizer } from '@angular/platform-browser';
import Global from 'src/app/Global';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { DatePipe } from '@angular/common';
import { PverifyPatientInsuranceModel } from 'src/app/modules/common/models/pverify-patient-insurance.model';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';
import { PverifyUploadImageComponent } from 'src/app/modules/common/component/pverify-upload-image/pverify-upload-image.component';
import { ChangeProviderBackupComponent } from 'src/app/modules/common/component/change-provider-backup/change-provider-backup.component';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
declare var gtag: any;
declare var moment: any;
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css'],
  providers: [PrmcHub, DatePipe],

})
export class WaitingRoomComponent extends BaseComponent implements OnInit, OnDestroy {
  model: AppointmentModel;
  id: string;
  @ViewChild('modal') modalProfile: ProviderProfileComponent;
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('modalImage') modalImage: PverifyUploadImageComponent;
  @ViewChild('changeProviderModal') changeProviderModal: ChangeProviderBackupComponent;

  routerName: string;
  urlTokbox: any;
  token: string;
  totalAppt: number = 0;
  timer: any;
  isShowEnableCamButton = true;
  localStream: MediaStream;
  sliders: any = [];
  pverifyInsurance: PverifyPatientInsuranceModel = new PverifyPatientInsuranceModel();

  isShowDiscoverFrom: boolean = true;
  constructor(
    @SkipSelf() private prmcHub: PrmcHub,
    private service: AppointmentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authenticate: AuthenticationService,
    private utilityService: UtilityService,
    private santizier: DomSanitizer,
    private dialog: CommonDialogService,
    private datePipe: DatePipe,
    private pverifyService: PverifyPatientInsuranceService,
    private patientProfileService: PatientProfileService
  ) {
    super(authenticate);
    this.model = new AppointmentModel();
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity(this.id);
      }

      this.getSliders();
    });

    this.prmcHub.onChangeStatusAppointmentNotify.subscribe(params => {
      if (params && params.ID && this.model && params.ID && this.model.ID == params.ID) {
        this.model.AppointmentStatus = params.AppointmentStatus;
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("InSession")) {
          if (this.model.ProviderID) {
            this.joinVideoCall();
          } else {
            this.getEntityAndCall(this.model.ID);
          }
        }
        if (this.model.AppointmentStatus &&
          (this.model.AppointmentStatus.StatusName.startsWith("Completed") || this.model.AppointmentStatus.StatusName.startsWith("Cancelled"))) {
          this.stopLocalStream();
        }
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("Completed")) {
          this.runGoogleAds();
          this.runBingAds();
        }
      }
    });

    setTimeout(() => {
      if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName.startsWith("InSession")) {
        this.joinVideoCall();
      }
    }, 2000);
  }

  changeProvider() {
    this.changeProviderModal.show(this.id);
  }

  checkOver5Min() {
    var currentDate = new Date();
    var appointmentTime = new Date(this.model.AppointmentTime);
    return moment(currentDate).diff(appointmentTime, 'minutes') > 5;
  }

  overDate() {
    var currentDate = new Date();
    var appointmentTime = new Date(this.model.AppointmentTime);
    return !this.model.IsOnDemand && appointmentTime && appointmentTime < currentDate;
  }

  enableMicCar() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        this.localStream = stream;
        this.isShowEnableCamButton = false;
      },
        e => {
          this.dialog.showSwalWarningAlert("Enable Camera and Mic",
            "<p>Please refresh this screen and allow camera and microphone access.</p>\
          ", true);
          this.isShowEnableCamButton = true;
        });
  }

  getSliders() {
    this.sliders = [];
    this.service.GetSliders().subscribe(r => {
      if (r) {
        var imgObjects = r.map(x => {
          return {
            image: x,
            thumbImage: x,
            title: ''
          }
        });

        this.sliders = imgObjects;
      }
    });
  }

  stopLocalStream() {
    if (this.localStream && this.localStream.getTracks) {
      this.localStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }

  onClosed(event) {
    this.token = null;
  }

  joinVideoCall() {
    this.getToken();
  }

  getToken() {
    if (this.id && !this.token) {
      this.service.createMeetingToken(this.id).subscribe(r => {
        this.token = r;
      });
    }
  }

  ngOnDestroy() {
    this.stopLocalStream()
  }

  ngOnInit() {
    this.getTotalAwaiting();
  }

  getTotalAwaiting() {
    if (this.id) {
      this.utilityService.CountHeadWaitingAppointment(this.id).subscribe(r => {
        this.totalAppt = r;
      });

      this.timer = setInterval(() => {
        this.utilityService.CountHeadWaitingAppointment(this.id).subscribe(r => {
          this.totalAppt = r;
        });
      }, 20000);
    }
  }

  setLiked() {
    if (this.id && this.model && !this.model.Liked) {
      this.service.SetLiked(this.id).subscribe(r => {
        if (r)
          this.model.Liked = true;
      });
    }
  }

  getEntityAndCall(id) {
    this.service.GetById(id).subscribe(result => {
      if (result) {
        this.model = result;
        this.getPverifyInsurance(this.model.PatientID);
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName == 'InSession') {
          this.joinVideoCall();
        }
      } else {
        this.router.navigateByUrl(`/404.html`);
      }
    }, erorr => {
      this.router.navigateByUrl(`/404.html`);
    });
  }

  getEntity(id) {
    this.urlTokbox = null;
    this.service.GetById(id).subscribe(result => {
      if (result) {
        this.model = result;
        if (this.model.PatientProfile.DiscoverFrom) {
          this.isShowDiscoverFrom = true;
        } else {
          this.isShowDiscoverFrom = false;
        }
        this.getPverifyInsurance(this.model.PatientID);
        if (this.model.AppointmentStatus && this.model.AppointmentStatus.StatusName == 'InSession') {
          setTimeout(() => {
            this.urlTokbox = this.santizier.bypassSecurityTrustResourceUrl(`https://tokbox.com/embed/embed/ot-embed.js?embedId=${Global.embebedId}&iframe=true&room=${this.model.ID}`);
          }, 3000);
        }
      } else {
        this.router.navigateByUrl(`/404.html`);
      }
    }, erorr => {
      this.router.navigateByUrl(`/404.html`);
    });
  }

  viewProfile(id) {
    this.modalProfile.show(id);
  }

  runGoogleAds() {
    gtag('event', 'conversion', { 'send_to': 'AW-638647302/A-5LCJHO6eEBEIb4w7AC' });
  }

  runBingAds() {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'CompletedAppt', { 'event_category': 'CompletedAppt', 'event_label': 'CompletedAppt', 'event_value': 1 });
  }

  uploadInsuranceImage() {
    if (this.pverifyInsurance?.ID)
      this.modalImage.show(this.pverifyInsurance.ID);
  }

  getPverifyInsurance(patientID) {
    this.pverifyService.getActiveByPatientID(patientID).subscribe(r => {
      if (r) {
        this.pverifyInsurance = r;
      }
    });
  }

  save() {
    var patientProfile = this.model.PatientProfile;
    if (patientProfile.DiscoverFrom === 'Other') {
      patientProfile.DiscoverFrom = patientProfile.OtherDiscoverFrom;
    }

    this.patientProfileService.UpdateDiscoverFrom(patientProfile).subscribe(r => {
      if (r) {
        this.getEntity(this.id);
        this.dialog.showToastrSuccess("Discover From", MessageConstant.REQUEST_SUCCESS_CONST);
      }
    });
  }

  cancel() {

  }
}