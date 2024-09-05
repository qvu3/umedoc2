import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { VideoCallRequestComponent } from '../video-call-request/video-call-request.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { ChangeProviderComponent } from '../change-provider/change-provider.component';
import { DomSanitizer } from '@angular/platform-browser';
import Global from 'src/app/Global'; 
@Component({
  selector: 'app-request-appointment-detail',
  templateUrl: './request-appointment-detail.component.html',
  styleUrls: ['./request-appointment-detail.component.css']
})
export class RequestAppointmentDetailComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @ViewChild('videoCallModal') videoCallModal: VideoCallRequestComponent;
  @ViewChild('changeProviderModal') changeProviderModal: ChangeProviderComponent;
  id: string;
  activeTab: string = 'Appointment-Info';
  model: AppointmentModel = new AppointmentModel();

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: CommonDialogService,
    activeRoute: ActivatedRoute,
    authService: AuthenticationService,
    private utilityService: UtilityService,
    private santizier: DomSanitizer
  ) {
    super(authService);
    activeRoute.params.subscribe(r => {
      this.id = r['{id}'];
      if (r.active) {
        this.activeTab = r.active;
      }
      this.getEntity();
    })

    activeRoute.queryParams.subscribe(r => {
      if (r.activeTab) {
        this.activeTab = r.activeTab;
      }
    });

    this.clickTab(this.activeTab);
  }

  ngOnInit() {
    this.utilityService.onNeedHideLayoutMain.emit(true);
  }

  ngOnDestroy() {
    this.utilityService.onNeedHideLayoutMain.emit(false);
  }

  getEntity() {
    this.appointmentService.GetById(this.id).subscribe(r => {
      this.model = r;
    });
  } 
  

  clickTab(tabName) {
    this.router.navigateByUrl(`/management/requested-appointment-details/${this.id}?activeTab=${tabName}`);
  }


  doVideoCall() {
    let url = `https://tokbox.com/embed/embed/ot-embed.js?embedId=${Global.embebedId}&iframe=true&allow=microphone,camera&room=${this.id}`;
    window.open(url, 'Video Call', 'height=600,width=1000,menubar=no,toolbar=no,status=no,scrollbars=no');
    this.appointmentService.InSessionAppointment(this.id).subscribe(
      r => {

        // open toxbox modal to call
        if (r && r.TokboxSessionId) {

          // window.open(
          //   `/management/call-appointment/${r.TokboxSessionId}`,
          //   'Video Call',
          //   'height=600,width=1000,menubar=no,toolbar=no,status=no,scrollbars=no'
          // );
        }
      },
      error => {
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  completedAppointment() {
    this.dialog.showSwalConfirmAlert('Are you sure you want to mark this appointment as completed?').then(isConfirmed => {
      if (isConfirmed) {
        this.executeCompletedAppointment(false);
      }
    });
  }


  executeCompletedAppointment(wasreferral) {
    this.appointmentService.CompletedAppointment(this.id, wasreferral).subscribe(
      r => {
        this.dialog.showToastrSuccess(
          'Appointment has been completed!',
          MessageConstant.REQUEST_SUCCESS_CONST
        );
        this.router.navigateByUrl('/management/requested-appointments');
      },
      error => {
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  cancelledAppointment() {
    this.appointmentService.CancelledAppointment(this.id).subscribe(
      r => {
        this.dialog.showToastrWarning('Appointment has been cancelled!');
        this.router.navigateByUrl('/management/requested-appointments');
      },
      error => {
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  changeProvider() {
    this.changeProviderModal.show(this.model.ID, this.model.ProviderUser);
  }


}
