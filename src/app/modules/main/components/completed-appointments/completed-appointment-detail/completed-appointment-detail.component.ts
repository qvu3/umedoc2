import { CombineExistingAcctModalComponent } from './../combine-existing-acct-modal/combine-existing-acct-modal.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { FutureAppointmentComponent } from '../../future-appointment/future-appointment.component';
import { ChangeProviderComponent } from '../../requested-appointments/change-provider/change-provider.component';
import { WriteWorkReleaseComponent } from '../../requested-appointments/write-work-release/write-work-release.component';
import { BrowserCallTwillioComponent } from 'src/app/modules/common/component/browser-call-twillio/browser-call-twillio.component';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { HealthDataPatientComponent } from '../../health-data-patient/health-data-patient.component';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { RestrictedPatientLogService } from 'src/app/modules/common/services/restricted-patient-log.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
import { SignatureProviderComponent } from '../../requested-appointments/signature-provider/signature-provider.component';
import { WriteLabOrderPreviewComponent } from '../../requested-appointments/write-lab-order-preview/write-lab-order-preview.component';
import { WriteLabOrderComponent } from '../../requested-appointments/write-lab-order/write-lab-order.component';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { InsuranceBalanceBillingModalComponent } from '../../insurance-balance-billings/insurance-balance-billing-modal/insurance-balance-billing-modal.component';
import { WriteReferralComponent } from '../../requested-appointments/write-referral/write-referral.component';
import { CancelReasonModalComponent } from '../../requested-appointments/cancel-reason-modal/cancel-reason-modal.component';
import { PatientBlockedListModalComponent } from 'src/app/modules/common/component/patient-blocked-list-modal/patient-blocked-list-modal.component';

@Component({
  selector: 'app-completed-appointment-detail',
  templateUrl: './completed-appointment-detail.component.html',
  styleUrls: ['./completed-appointment-detail.component.css']
})
export class CompletedAppointmentDetailComponent extends BaseComponent implements OnInit, OnDestroy {
  model: AppointmentModel;
  patientProfile: PatientProfileModel;
  id: string;
  patientId: string;
  totalTaskTodo: number = 0;
  activeTab: string = "Appointment-Info";
  @ViewChild('futureModal') futureModal: FutureAppointmentComponent;
  @ViewChild('changeProviderModal') changeProviderModal: ChangeProviderComponent;
  @ViewChild('writeWorkReleaseModal') writeWorkReleaseModal: WriteWorkReleaseComponent;
  @ViewChild('browserCall') browserCallModal: BrowserCallTwillioComponent;
  @ViewChild('healthDataModal') healthDataModal: HealthDataPatientComponent;
  @ViewChild('writeLabOrderModal') writeLabOrderModal: WriteLabOrderComponent;
  @ViewChild('writeReferralModal') writeReferralModal: WriteReferralComponent;
  @ViewChild('signatureModal') signatureModal: SignatureProviderComponent;
  @ViewChild('orderPdfPreview') orderPdfPreview: WriteLabOrderPreviewComponent;
  @ViewChild('insuranceBillingModal') insuranceBillingModal: InsuranceBalanceBillingModalComponent;
  @ViewChild('cancelReasonModal') cancelReasonModal: CancelReasonModalComponent;
  @ViewChild('blockedModal') blockedModal: PatientBlockedListModalComponent;
  @ViewChild('combineUserModal') combineUserModal:CombineExistingAcctModalComponent;

  constructor(
    private router: Router,
    activeRoute: ActivatedRoute,
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService,
    private restrictedPatientLogService: RestrictedPatientLogService,
    private utilityService: UtilityService,
    private appointmentService: AppointmentService,
    private providerTaskService: ProviderTaskService
  ) {
    super(authService);
    activeRoute.params.subscribe(r => {
      if (!r || !r['{id}']) {
        router.navigate(['/management/completed-appointments']);
        return;
      }
      this.id = r["{id}"];
      this.getEntity();
      this.getPatientProfile();

      authService.onReloadTaskList.subscribe(r => {
        this.getTotalTaskTodo();
      });
    });
  }

  ngOnInit() {
    //this.utilityService.onNeedHideLayoutMain.emit(true);
  }

  ngOnDestroy() {
    //this.utilityService.onNeedHideLayoutMain.emit(false);
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

  addInsuranceBalanceBilling() {
    if (this.model && this.model.ID) {
      this.insuranceBillingModal.show(null, this.model.ID);
    }
  }

  clickTab(tabName) {
    this.router.navigateByUrl(`/management/completed-appointment-details/${this.id}?activeTab=${tabName}`);
  }

  combineAcct(){
    if(this.model && this.model.PatientID){
      this.combineUserModal.show(this.model.PatientID);
    }
  }

  getEntity() {
    if (this.id) {
      this.appointmentService.GetById(this.id).subscribe(r => {
        this.model = r;
      });
    }
  }

  addFutureAppt() {
    this.futureModal.show(this.model.PatientID);
  }

  changeProvider() {
    this.changeProviderModal.show(this.model.ID, this.model.ProviderUser);
  }

  onCloseChangeProvider() {
    this.router.navigateByUrl('/management/completed-appointments');
  }

  writeWorkRelease() {
    this.writeWorkReleaseModal.show(this.id);
  }

  getPatientProfile() {
    if (this.id) {
      this.patientProfileService.GetByAppointment(this.id).subscribe(r => {
        this.patientProfile = r;
        this.patientId = r.PatientID;
        this.getTotalTaskTodo();
      });
    }
  }

  restrictPatient(profileId) {
    this.restrictedPatientLogService.ChangeRestrictPatient(profileId).subscribe(result => {
      if (result) {
        this.dialog.showToastrSuccess('Change Restrict Patient', MessageConstant.REQUEST_SUCCESS_CONST);
        this.getPatientProfile();
      }
      else {
        this.dialog.showSwalErrorAlert('Change Restrict Patient', MessageConstant.FAILURE_REQUEST);
      }
    },
      error => {
        this.dialog.showSwalErrorAlert('Change Restrict Patient', error.error);
      });
  }

  getTotalTaskTodo() {
    this.providerTaskService.CountTotalTaskListTodoByPatientAsync(this.patientId).subscribe(r => {
      this.totalTaskTodo = r;
    });
  }


  writeLabOrder() {
    this.writeLabOrderModal.show(this.id);
  }

  writeReferral() {
    this.writeReferralModal.show(this.id);
  }

  OnClosedLabOrder(event) {
    if (event) {
      this.signatureModal.model = event;
      this.signatureModal.show();
    }
  }

  OnClosedReferral(event) {
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

  cancelAppt() {
    this.dialog.showSwalConfirmAlert('Are you sure you want to Cancel this Appointment?').then(isConfirmed => {
      if (isConfirmed) {
        this.cancelReasonModal.show(this.id);
        this.cancelReasonModal.isCancelCompletedAppt = true;

      }
    });
  }

  cancelReasonCallback(event: AppointmentModel) {
    this.appointmentService.CancelledCompletedAppointmentWithReason(event).subscribe(
      r => {
        this.dialog.showToastrWarning('Appointment has been cancelled!');
        this.router.navigateByUrl('/management/completed-appointments');
      },
      error => {
        this.dialog.showSwalErrorAlert(
          'Error',
          MessageConstant.FAILURE_REQUEST
        );
      }
    );
  }

  onCanceled(event) {
    if (event) {
    }
  }

  addPatientBlockList() {
    this.blockedModal.show(this.model.PatientID);
  }
}

