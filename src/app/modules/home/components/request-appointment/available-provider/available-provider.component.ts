import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileComponent } from '../provider-profile/provider-profile.component';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import { PrmcHub } from 'src/app/modules/common/services/prmc-hub';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-available-provider',
  templateUrl: './available-provider.component.html',
  styleUrls: ['./available-provider.component.css']
})
export class AvailableProviderComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modalProfile: ProviderProfileComponent;
  listProvider: Array<ProviderProfileModel> = new Array<ProviderProfileModel>();
  numberProvider: number = 0;
  isShowNumberProvider: boolean = false;
  IsSubmitting: boolean = true;
  @Input() model: AppointmentModel;
  isScheduler: boolean = false;
  onChangeDoctorSubcription: Subscription; 
  isSearching: boolean = false;
  isShowAvailableProvider: boolean = false;
  constructor(private providerProfileService: ProviderProfileService,
    private authService: AuthenticationService,
    private utilityService: UtilityService,
    private dialog: CommonDialogService,
    private activeRouter: ActivatedRoute,
    private prmc_hub: PrmcHub) {
    super(authService);
    this.onChangeDoctorSubcription = this.prmc_hub.onChangeStatusDoctor.subscribe(r => {
      this.getProviderAvailable(!this.model.IsOnDemand);
      if (r && r.ProviderID) {
        if (this.model && this.model.ProviderID == r.ProviderID && !r.IsAvailable) {
          this.model.ProviderID = null;
          this.dialog.showSwalErrorAlert('Available Provider', 'Provider who you selected no longer avaliabled for now, please choose another.')
        }
      }
    }); 
  }

  ngOnInit() {
    this.getProviderAvailable(!this.model.IsOnDemand);
    this.registryRefresh();
  }

  ngOnDestroy() {
    this.onChangeDoctorSubcription.unsubscribe();
  }

  viewProfile(id) {
    this.modalProfile.show(id);
  }

  registryRefresh() {
    if (this.utilityService.onNeedRefreshProvider) {
      this.utilityService.onNeedRefreshProvider.subscribe(r => {
        this.getProviderAvailable(!this.model.IsOnDemand);
      });
    }
  }

  getProviderAvailable(isScheduler) {
    this.listProvider = new Array<ProviderProfileModel>();
    if (this.model.PreCheckModel.State) {
      this.isSearching = true;
      this.providerProfileService.GetIsAvailable(isScheduler, this.model.PreCheckModel.State).subscribe(r => {
        if (r) {
          this.isShowAvailableProvider = true;
          this.listProvider = r;
          this.isSearching = false;
          if (this.listProvider != null && this.listProvider.length == 1) {
            this.model.ProviderID = this.listProvider[0].ProviderID;
          }
        }
      }, error => {
        this.isSearching = false;
      });
    }
  }

  check() {
    if (this.model && !this.model.IsOnDemand && (!this.model.AppointmentSlotID || !this.model.AppointmentTime)) {
      this.dialog.showToastrError("Appointment Time", "Please select appointment time");
    }
  }

  reloadProvider(isScheduler) {
    this.model.AppointmentTime = null;
    this.model.ProviderID = null;
    this.getProviderAvailable(isScheduler);
  }

  selectDoctor(userId) {
    this.model.ProviderID = userId;
  }

  generateSpecialty(listAssignment) {
    if (listAssignment && listAssignment.length > 0) {
      let str = "";
      listAssignment.forEach((ele, index) => {
        if (ele.ProviderSpecialty) {
          str += index > 0 ? ', ' + ele.ProviderSpecialty.SpecialtyName : ele.ProviderSpecialty.SpecialtyName;
        }
      });
      return str;
    }
  }
  resetProviderSelected(){
    if(this.model){
      this.model.AppointmentTime = null;
      this.model.AppointmentSlotID = null;
      this.model.ProviderID = null;
    }
  }
}

