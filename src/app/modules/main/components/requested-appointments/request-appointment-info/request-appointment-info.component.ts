import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { ChangeProviderComponent } from '../change-provider/change-provider.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FaxDocumentCompanyComponent } from '../../fax-document-company/fax-document-company.component';
import { AddNoteInfoComponent } from '../add-note-info/add-note-info.component';
import { FutureAppointmentComponent } from '../../future-appointment/future-appointment.component';
import { ParticipantInfoComponent } from '../participant-info/participant-info.component';
import { RescheduleModalComponent } from 'src/app/modules/home/components/reschedule-modal/reschedule-modal.component';
import { WriteWorkReleaseComponent } from '../write-work-release/write-work-release.component';
import { BrowserCallTwillioComponent } from 'src/app/modules/common/component/browser-call-twillio/browser-call-twillio.component';
import { VideoCallFrameComponent } from 'src/app/modules/common/component/video-call-frame/video-call-frame.component';
import { HealthDataPatientComponent } from '../../health-data-patient/health-data-patient.component';
import { InviteGuestToVideoComponent } from '../invite-guest-to-video/invite-guest-to-video.component';
import { CancelReasonModalComponent } from '../cancel-reason-modal/cancel-reason-modal.component';
import { WriteLabOrderComponent } from '../write-lab-order/write-lab-order.component';
import { SignatureProviderComponent } from '../signature-provider/signature-provider.component';
import { WriteLabOrderPreviewComponent } from '../write-lab-order-preview/write-lab-order-preview.component';
import { VideoCallHistoryService } from 'src/app/modules/common/services/video-call-history.service';
import { WriteReferralComponent } from '../write-referral/write-referral.component';
import { PatientBlockedListModalComponent } from 'src/app/modules/common/component/patient-blocked-list-modal/patient-blocked-list-modal.component';
@Component({
  selector: 'app-request-appointment-info',
  templateUrl: './request-appointment-info.component.html',
  styleUrls: ['./request-appointment-info.component.css']
})
export class RequestAppointmentInfoComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('videoCall') videoCallModal: VideoCallFrameComponent;
  @ViewChild('changeProviderModal') changeProviderModal: ChangeProviderComponent;
  @ViewChild('faxDoc') modal: FaxDocumentCompanyComponent;
  @ViewChild('noteInfo') noteInfo: AddNoteInfoComponent;
  @ViewChild('futureModal') futureModal: FutureAppointmentComponent;
  @ViewChild('participantModal') participantModal: ParticipantInfoComponent;
  id: string;
  model: AppointmentModel = new AppointmentModel();
  @ViewChild('rescheduleModal') rescheduleModal: RescheduleModalComponent;
  @ViewChild('writeWorkReleaseModal') writeWorkReleaseModal: WriteWorkReleaseComponent;
  @ViewChild('browserCall') browserCallModal: BrowserCallTwillioComponent;
  @ViewChild('healthDataModal') healthDataModal: HealthDataPatientComponent;
  @ViewChild('inviteGuestToVideoModal') inviteGuestToVideoModal: InviteGuestToVideoComponent;
  @ViewChild('cancelReasonModal') cancelReasonModal: CancelReasonModalComponent;
  @ViewChild('writeLabOrderModal') writeLabOrderModal: WriteLabOrderComponent;
  @ViewChild('signatureModal') signatureModal: SignatureProviderComponent;
  @ViewChild('orderPdfPreview') orderPdfPreview: WriteLabOrderPreviewComponent;

  @ViewChild('writeReferralModal') writeReferralModal: WriteReferralComponent;
  @ViewChild('blockedListModal') blockedListModal: PatientBlockedListModalComponent;

  token: string;
  participants: any;
  participantClients: string;
  inviteUserCall: string;
  timer: any;
  isCompletedAppointment: boolean = false;
  isCancelledAppointment: boolean = false;
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: CommonDialogService,
    activeRoute: ActivatedRoute,
    authService: AuthenticationService,
    private utilityService: UtilityService,
    private santizier: DomSanitizer,
    private videoCallHistoryService: VideoCallHistoryService,
  ) {
    super(authService);
    activeRoute.params.subscribe(r => {
      this.id = r['{id}'];
      this.getEntity();
    })
  }

  turnCamMic(event) {
    if (this.videoCallModal) {
      this.videoCallModal.turnOnCamMic();
    }
  }

  showHealthData() {
    if (this.model && this.model.PatientID) {
      this.healthDataModal.show(this.model.PatientID);
    }
  }

  callClient() {
    if (this.model && this.model.PatientUser && this.model.PatientUser.CellPhone) {
      this.browserCallModal.phoneNumber = this.model.PatientUser.CellPhone;
      this.browserCallModal.clientName = `${this.model.PatientUser.FirstName} ${this.model.PatientUser.LastName}`;
      this.browserCallModal.show();
    }
    else {
      this.dialog.showSwalErrorAlert("Call Patient", "Patient Phone is not found");
    }
  }

  getFullName() {
    if (this.model && this.model.PatientUser) {
      return `${this.model.PatientUser.FirstName} ${this.model.PatientUser.LastName}`;
    }
    return '';
  }

  calAgePatient() {
    if (this.model.PatientUser != null && this.model.PatientUser.DOB) {
      var ages = this.calculateAge(new Date(this.model.PatientUser.DOB));
      if (ages) {
        return `(${ages} years old)`;
      }
    }
    return '';
  }

  reschedule() {
    if (this.id) {
      this.rescheduleModal.show(this.id);
    }
  }


  getToken() {
    if (this.id) {
      this.appointmentService.createMeetingToken(this.id).subscribe(r => {
        this.token = r;
      });
    }
  }

  ngOnInit() {
    this.getInviteUserCall();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getEntity() {
    this.appointmentService.GetById(this.id).subscribe(r => {
      this.model = r;
    });
  }

  onClosed(event) {
    this.token = '';
  }

  completedAppointment() {
    this.isCompletedAppointment = true;
    let msg = '<p>Are you sure you want to mark this appointment as completed?<\/p>';
    if (this.noteInfo && this.noteInfo.model
      && (this.noteInfo.model.Subjective
        || this.noteInfo.model.FollowUp
        || this.noteInfo.model.Plan)) {
      msg = `<p style='color:red'>Your note has not been Saved!</p> ${msg}`;
    }
    this.dialog.showSwalConfirmAlert(msg, true).then(isConfirmed => {
      if (isConfirmed) {
        this.executeCompletedAppointment(false);
      } else {
        this.isCompletedAppointment = false;
      }
    });
  }


  executeCompletedAppointment(wasreferral) {
    this.appointmentService.CompletedAppointment(this.id, wasreferral).subscribe(
      r => {
        this.isCompletedAppointment = false;
        this.dialog.showToastrSuccess(
          'Appointment has been completed!',
          MessageConstant.REQUEST_SUCCESS_CONST
        );

        this.router.navigateByUrl('/management/requested-appointments');
      },
      error => {
        this.isCompletedAppointment = false;
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  cancelReasonCallback(event: AppointmentModel) {
    event.ID = this.id;
    this.appointmentService.CancelledAppointmentWithReason(event).subscribe(
      r => {
        this.dialog.showToastrWarning('Appointment has been cancelled!');
        this.router.navigateByUrl('/management/requested-appointments');
        this.isCancelledAppointment = false;
      },
      error => {
        this.isCancelledAppointment = false;
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  onCanceled(event) {
    if (event) {
      this.isCancelledAppointment = false;
    }
  }

  cancelledAppointment() {
    this.isCancelledAppointment = true;
    this.dialog.showSwalConfirmAlert('Are you sure you want to Cancel this Appointment?').then(isConfirmed => {
      if (isConfirmed) {
        this.cancelReasonModal.show(this.id);
      } else {
        this.isCancelledAppointment = false;
      }
    });
  }

  changeProvider() {
    this.changeProviderModal.show(this.model.ID, this.model.ProviderUser);
  }

  onCloseChangeProvider() {
    this.router.navigateByUrl('/management/requested-appointments');
  }

  closeFax(event) {
    this.utilityService.needRefreshDocNotify();
  }

  executeFaxDocument() {
    this.modal.show();
  }

  addFutureAppt() {
    this.futureModal.show(this.model.PatientID);
  }

  onChange(event) {
    if (event) {
      this.participantClients = JSON.stringify(event);
      this.participantModal.participantClients = this.participantClients;
    }
  }

  viewParticipants() {
    if (!this.model.RoomName) return;
    this.participantModal.participantClients = this.participantClients;
    this.participantModal.show(this.model.RoomName);
  }

  writeWorkRelease() {
    this.writeWorkReleaseModal.show(this.id);
  }

  onRefreshParticipantClient(event) {
    this.participantModal.participantClients = this.participantClients;
  }

  inviteGuestToVideo() {
    this.inviteGuestToVideoModal.show(this.id);
  }

  writeLabOrder() {
    this.writeLabOrderModal.show(this.id);
  }

  writeReferral() {
    this.writeReferralModal.show(this.id);
  }

  
  OnClosedReferral(event) {
    if (event) {
      this.signatureModal.model = event;
      this.signatureModal.show();
    }
  } 

  OnClosedLabOrder(event) {
    if (event) {
      this.signatureModal.model = event;
      this.signatureModal.show();
    }
  }

  signatureModalClosed(event) {
    if (event) {
      this.orderPdfPreview.model = event;
      this.orderPdfPreview.show();
    }
  }

  getInviteUserCall() {
    this.videoCallHistoryService.GetByAppointmentID(this.id).subscribe(r => {
      if (r && r.length > 0) {
        if (r.length == 1) {
          this.inviteUserCall = r.join(", ") + " in video call";
        } else {
          this.inviteUserCall = r.join(", ") + " are in video call";
        }
      } else {
        this.inviteUserCall = '';
      }
    }
    );

    this.timer = setInterval(() => {
      this.videoCallHistoryService.GetByAppointmentID(this.id).subscribe(r => {
        if (r && r.length > 0) {
          if (r.length == 1) {
            this.inviteUserCall = r.join(", ") + " in video call";
          } else {
            this.inviteUserCall = r.join(", ") + " are in video call";
          }
        } else {
          this.inviteUserCall = '';
        }
      }
      );
    }, 7000);
  }

  addPatientBlockList(){
    this.blockedListModal.show(this.model.PatientID);
  }
}
