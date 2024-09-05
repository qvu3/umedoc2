import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Form, NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { ProviderProfileService } from 'src/app/modules/common/services/provider-profile.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { ProviderProfileModel } from 'src/app/modules/common/models/provider-profile.model';
import { AppointmentReasonService } from 'src/app/modules/common/services/appointment-reason.service';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ScheduleProviderAppointmentComponent } from 'src/app/modules/common/component/schedule-provider-appointment/schedule-provider-appointment.component';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { AppointmentReasonAssignmentModel } from 'src/app/modules/common/models/appointment-reason-assignment.model';
import Global from 'src/app/Global';
import { ApptCategoryModel } from 'src/app/modules/common/models/appt-category.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { PverifyPatientInsuranceModel } from 'src/app/modules/common/models/pverify-patient-insurance.model';
import { PverifyPatientInsuranceService } from 'src/app/modules/common/services/pverify-patient-insurance.service';

@Component({
  selector: 'app-future-appointment',
  templateUrl: './future-appointment.component.html',
  styleUrls: ['./future-appointment.component.css']
})
export class FutureAppointmentComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  providers: Array<Select2OptionData> = new Array<Select2OptionData>();
  reasons: Array<Select2OptionData> = new Array<Select2OptionData>();
  model: AppointmentModel = new AppointmentModel();
  optionsProvider: Options;
  optionsReason: Options;
  Submitting: boolean = false;
  folowUpId: string;
  provider: ProviderProfileModel;
  providerList: any;
  trueValue: boolean = true;
  falseValue: boolean = false;
  us_statelist: any
  categoryList: Array<ApptCategoryModel> = new Array<ApptCategoryModel>();
  patientModel: PatientProfileModel;
  @ViewChild('scheduler') scheduler: ScheduleProviderAppointmentComponent;
  insurances: PverifyPatientInsuranceModel[] = [];
  //isTravelMedicine: boolean = false;
  constructor(authService: AuthenticationService,
    private providerProfileService: ProviderProfileService,
    private appointmentService: AppointmentService,
    private appointmentSlotService: AppointmentSlotService,
    private patientProfileService: PatientProfileService,
    private dialog: CommonDialogService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService) {
    super(authService);
    this.us_statelist = Global.US_StateList;
  }

  ngOnInit(): void {
    this.optionsProvider = {
      multiple: false,
      allowClear: true
    };
  }

  changeProvider(event) {
    this.provider = null;
    this.model.AppointmentTime = null;
    if (event) {
      setTimeout(() => {
        var list = this.providerList.filter(x => x.ProviderID == event);
        if (list && list.length > 0) {
          this.provider = list[0];
          this.model.SelectedProvider = list[0];
          this.selectPaidByInsurance(true);
        }
      }, 500);
    }
    else {
      this.selectPaidByInsurance(false);
    }
  }

  changeState(event) {
    this.resetAppt();
    this.getApptCategories();
  }

  resetAppt() {
    this.providers = null;
    this.model.ProviderID = null;
    this.model.AppointmentSlotID = null;
    this.model.AppointmentTime = null;
    this.model.SelectedProvider = null;
    this.categoryList = null;
    this.model.ApptCategoryCode = null;
    this.model.ApptCategoryID = null;
  }

  getApptCategories() {
    if (this.model.State) {
      this.providerProfileService.GetListAvailableApptCategory(this.model.State, !this.model.IsOnDemand).subscribe(r => {
        this.categoryList = r;
        // this.checkIsTraveMedicine();
      });
    }
  }

  // checkIsTraveMedicine() {
  //   if (this.model && this.model.ApptCategoryID && this.categoryList) {
  //     this.isTravelMedicine = this.categoryList.filter(x => x.ID == this.model.ApptCategoryID && x.Name.toLowerCase() == 'travel medicine').length > 0;
  //     if (this.isTravelMedicine) {
  //       this.selectPaidByInsurance(false);
  //     }
  //   }
  //   else {
  //     this.isTravelMedicine == false;
  //   }
  // }

  changeApptCategory(event) {
    var category = this.categoryList.find(x => x.ID == this.model.ApptCategoryID);
    this.model.ApptCategoryCode = category?.Code;
    //this.checkIsTraveMedicine();
    this.getProvider();
  }

  validateSlot() {
    if (!this.model.AppointmentTime && !this.model.IsOnDemand) {
      this.dialog.showSwalErrorAlert("Error", "Please select Appointment Time");
      return false;
    }
    return true;
  }

  convertAppointmentReason() {
    if (this.model.Reasons) {
      this.model.AppointmentReasonList = [];
      this.model.Reasons.forEach(e => {
        var reason = new AppointmentReasonAssignmentModel();
        reason.AppointmentReasonID = e;
        this.model.AppointmentReasonList.push(reason);
      });
    }
  }

  save() {
    this.convertAppointmentReason();
    if (!this.validateSlot() || !this.model.AppointmentReasonList) return;

    this.Submitting = true;
    if (this.model.IsOnDemand) {
      this.appointmentService.SaveRequestAppointmentByCustomerAndCardFuture(this.model)
        .subscribe(r => {
          this.Submitting = false;
          if (r && r.ID) {
            this.dialog.showToastrSuccess("Create F/u Visit", "Appointment is created successfully");
            this.hide();
          }
        }, error => {
          this.dialog.showSwalErrorAlert("Error", error.error);
        });
    }
    else {
      this.appointmentSlotService.CheckAvailableAppointSlot(this.model).subscribe(k => {
        if (k) {
          this.appointmentService.SaveRequestAppointmentByCustomerAndCardFuture(this.model)
            .subscribe(r => {
              this.Submitting = false;
              if (r && r.ID) {
                this.dialog.showToastrSuccess("Create F/u Visit", "Appointment is created successfully");
                this.hide();
              }
            }, error => {
              this.dialog.showSwalErrorAlert("Error", error.error);
            });
        } else {
          this.dialog.showSwalErrorAlert("Error", "Appointment slot is unavailable. Please select another slot.")
        }
      });
    }
  }

  getProvider() {
    this.providers = new Array<Select2OptionData>();
    if (this.model.State) {
      // this.resetAppt();
      var today = new Date()
      today.setHours(0, 0, 0);

      this.model.RequestDate = this.model.RequestDate ?? today;
      if (this.model.IsOnDemand) {
        this.providerProfileService
          .GetRequestProviders(this.model)
          .subscribe((r) => {
            this.providerList = r;
            var isExistMe = false;
            var list = r.map(x => {
              if (x.ProviderID == this.currentUser.Id) {
                isExistMe = true;
              }
              return { id: x.ProviderID, text: x.ProviderName, source: x } as Select2OptionData;
            });
            if (list) {
              this.providers = list;
            }
            if (isExistMe) {
              var selectedProvider = this.providerList.filter(x => x.ProviderID == this.currentUser.Id);
              if (selectedProvider && selectedProvider.length > 0) {
                this.model.SelectedProvider = selectedProvider[0];
                this.model.ProviderID = this.currentUser.Id;
                this.selectPaidByInsurance(true);
              }
            }
          });
      }
      else {
        this.providerProfileService.GetAvailableFollowUpProviders(this.model).subscribe(r => {
          this.providerList = r;

          var isExistMe = false;
          var list = r.map(x => {
            if (x.ProviderID == this.currentUser.Id) {
              isExistMe = true;
            }
            return { id: x.ProviderID, text: x.ProviderName, source: x } as Select2OptionData;
          });
          if (list) {
            this.providers = list;
          }
          if (isExistMe) {
            var selectedProvider = this.providerList.filter(x => x.ProviderID == this.currentUser.Id);
            if (selectedProvider && selectedProvider.length > 0) {
              this.model.SelectedProvider = selectedProvider[0];
              this.model.ProviderID = this.currentUser.Id;
              this.selectPaidByInsurance(true);
            }
          }
        });
      }
    }
  }


  show(patientId) {
    if (!patientId) return;
    this.model = new AppointmentModel();
    this.model.PatientID = patientId;
    this.model.State = this.currentUser.State;
    this.model.IsOnDemand = false;
    this.model.ApptCategoryID = "";
    this.getApptCategories();
    this.getPatientProfileEntity();
    this.modal.show();
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  getPatientProfileEntity() {

    this.pverifyPatientInsuranceService.getByPatient(this.model.PatientID).subscribe(r => {
      this.insurances = r;
    });

    this.patientModel = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(this.model.PatientID).subscribe(r => {
      this.patientModel = r;
      this.selectPaidByInsurance(this.model.PaidByInsurance);
    });
  }

  selectPaidByInsurance(value) {
    this.model.PaidByInsurance = null;
    //if (this.insurances?.length > 0 && !this.isTravelMedicine) {
    if (this.insurances?.length > 0) {
      if (this.canChangePaidByInsurance()) {
        this.model.PaidByInsurance = value;
      } else {
        this.model.PaidByInsurance = false;
      }
    } else {
      this.model.PaidByInsurance = false;
    }
  }

  changeInsurance(event) {
    this.patientModel.PatientInsurances = event;
  }

  canChangePaidByInsurance() {
    // if (this.insurances && this.insurances.length > 0 && !this.isTravelMedicine) {
    if (this.insurances && this.insurances.length > 0) {
      var takeMedicare = this.provider?.ProviderLicenses?.filter(x => x.LicenseState == this.model?.State && x.TakeMedicare).length > 0;
      var takeMedicaid = this.provider?.ProviderLicenses?.filter(x => x.LicenseState == this.model?.State && x.TakeMedicaid).length > 0;
      var takeInsurance = this.provider?.ProviderLicenses?.filter(x => x.LicenseState == this.model?.State && x.TakeInsurance).length > 0;
      return takeMedicare || takeMedicaid || takeInsurance;
    }

    return false;
  }
}
