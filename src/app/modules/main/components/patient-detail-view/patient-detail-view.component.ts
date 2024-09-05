import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { RestrictedPatientLogService } from 'src/app/modules/common/services/restricted-patient-log.service';
import { ProviderTaskService } from 'src/app/modules/common/services/provider-task.service';
import { FutureAppointmentComponent } from '../future-appointment/future-appointment.component';
import { BrowserCallTwillioComponent } from 'src/app/modules/common/component/browser-call-twillio/browser-call-twillio.component';
import { HealthDataPatientComponent } from '../health-data-patient/health-data-patient.component';
import { PatientBlockedListModalComponent } from 'src/app/modules/common/component/patient-blocked-list-modal/patient-blocked-list-modal.component';
import { CombineExistingAcctModalComponent } from '../completed-appointments/combine-existing-acct-modal/combine-existing-acct-modal.component';

@Component({
  selector: 'app-patient-detail-view',
  templateUrl: './patient-detail-view.component.html',
  styleUrls: ['./patient-detail-view.component.css']
})
export class PatientDetailViewComponent extends BaseComponent implements OnInit, OnDestroy {
  model: PatientProfileModel;
  providerProfile: ProviderProfileModel;
  id: string;
  totalTaskTodo: number = 0;
  @ViewChild('futureModal') futureModal: FutureAppointmentComponent;
  @ViewChild('browserCall') browserCallModal: BrowserCallTwillioComponent;
  @ViewChild('healthDataModal') healthDataModal: HealthDataPatientComponent;
  @ViewChild('blockedListModal') blockedListModal: PatientBlockedListModalComponent;
  @ViewChild('combineUserModal') combineUserModal:CombineExistingAcctModalComponent;

  constructor(private router: Router,
    activeRoute: ActivatedRoute,
    authService: AuthenticationService,
    private utilityService: UtilityService,
    private restrictedPatientLogService: RestrictedPatientLogService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService,
    private providerProfileService: ProviderProfileService,
    private providerTaskService:ProviderTaskService
  ) {
    super(authService);
    activeRoute.params.subscribe(r => {
      this.id = r["{id}"];
      if (this.id) {
        this.getEntity();
        this.getProviderProfile();
        this.getTotalTaskTodo();
      }
    });
    authService.onReloadTaskList.subscribe(r => {
      this.getTotalTaskTodo();
    });
  }

  ngOnInit() {

    //this.utilityService.onNeedHideLayoutMain.emit(true);
  }

  ngOnDestroy() {
    //this.utilityService.onNeedHideLayoutMain.emit(false);
  }

  getEntity() {
    if (this.id) {
      this.patientProfileService.GetIncludePatientUser(this.id).subscribe(r => {
        this.model = r;
      });
    }
  }

  combineAcct(){
    if(this.model && this.model.PatientID){
      this.combineUserModal.show(this.model.PatientID);
    }
  }

  getProviderProfile() {
    this.providerProfileService.GetIncludeById(this.currentUser.Id).subscribe(r => {
      this.providerProfile = r;
    });
  }

  restrictPatient(profileId) {
    this.restrictedPatientLogService.ChangeRestrictPatient(profileId).subscribe(result => {
      if (result) {
        this.dialog.showToastrSuccess('Change Restrict Patient', MessageConstant.REQUEST_SUCCESS_CONST);
        this.getEntity();
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
    this.providerTaskService.CountTotalTaskListTodoByPatientAsync(this.id).subscribe(r => {
      this.totalTaskTodo = r;
    });
  }

  addFutureAppt() {
    this.futureModal.show(this.model.PatientID);
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

  showPatientBlockWatch(){
    this.blockedListModal.show(this.model.PatientID);
  }
}
