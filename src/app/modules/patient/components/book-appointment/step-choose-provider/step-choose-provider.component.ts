import { CommonDialogService } from './../../../../common/services/dialog.service';
import { CompanyService } from './../../../../common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Global from "src/app/Global";
import { BaseComponent } from "src/app/modules/base.component";
import { AppointmentSlotGroupModel } from "src/app/modules/common/models/appointment-slot-group.model";
import { AppointmentModel } from "src/app/modules/common/models/appointment.model";
import { ProviderProfileViewModel } from "src/app/modules/common/models/provider-profile-request.model";
import { PverifyPatientInsuranceModel } from "src/app/modules/common/models/pverify-patient-insurance.model";
import { AppointmentSlotService } from "src/app/modules/common/services/appointment-slot.service";
import { AuthenticationService } from "src/app/modules/common/services/authentication.service";
import { ProviderProfileService } from "src/app/modules/common/services/provider-profile.service";
import { PverifyPatientInsuranceService } from "src/app/modules/common/services/pverify-patient-insurance.service";
import { ProviderProfileComponent } from "src/app/modules/home/components/request-appointment/provider-profile/provider-profile.component";
declare var moment: any;
@Component({
  selector: "app-step-choose-provider",
  templateUrl: "./step-choose-provider.component.html",
  styleUrls: ["./step-choose-provider.component.scss"],
})
export class StepChooseProviderComponent
  extends BaseComponent
  implements AfterViewInit {
  states = [];
  model: AppointmentModel = new AppointmentModel();
  providers: Array<ProviderProfileViewModel>;
  @ViewChild("modal") modal: ProviderProfileComponent;
  slot: AppointmentSlotGroupModel;
  selectedProvider: ProviderProfileViewModel;
  apptCategoryID: string;
  isTravelMedicine: boolean = false;
  isWeightLoss: boolean = false;
  isDiabeticManagement: boolean = false;
  isSkinCare: boolean = false;
  isFitness: boolean = false;
  isMedicationRefill = false;
  insurances: Array<PverifyPatientInsuranceModel> = [];
  submission_id: string;
  companyInfo: CompanyModel = new CompanyModel();
  constructor(
    private authService: AuthenticationService,
    private providerProfileService: ProviderProfileService,
    private appointmentSlotService: AppointmentSlotService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService,
    private companyService: CompanyService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private dialog: CommonDialogService
  ) {
    super(authService);
    this.states = Global.US_StateList;
    this.authService.onLoadCategoryIDEvent.subscribe((r) => {
      this.apptCategoryID = r;
    });
    this.model = this.authService.requestAppointment;
    this.model.IsOnDemand =
      this.authService.IsOnDemandAppointment == "now" ? true : false;

    this.activeRouter.parent.params.subscribe((r) => {
      this.isTravelMedicine =
        r && r["category"] && r["category"].toLowerCase() === "travel_medicine";
      this.isWeightLoss =
        r && r["category"] && r["category"].toLowerCase() === "weight_loss_consultation";
      this.isDiabeticManagement = r && r['category'] && r['category'].toLowerCase() === 'diabetic_management';
      this.isSkinCare = r && r['category'] && r['category'].toLowerCase() === 'skin_care';
      this.isFitness = r && r['category'] && r['category'].toLowerCase() === 'fitness';
      this.isMedicationRefill = r && r['category'] && r['category'].toLowerCase() === 'medication_refill';
    });
    this.activeRouter.queryParams.subscribe((r) => {
      this.submission_id = r["submission_id"];
      if (this.submission_id) {
        this.model.JFSubmissionID = this.submission_id;
        this.authService.requestAppointment = Object.assign({}, this.model);
        if (this.isTravelMedicine) {
          this.router.navigate(["../choose-countries"], {
            relativeTo: this.activeRouter,
          });
        } else {
          this.router.navigate(["../choose-provider"], {
            relativeTo: this.activeRouter,
          });
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.initState();
    this.reset();
    this.getCompanyInfo();
    this.getProviders();
    this.getPatientProfileEntity();

    if (this.isTravelMedicine && !this.model.JFSubmissionID) {
      this.router.navigate(["../reasons"], { relativeTo: this.activeRouter });
    }
  }

  getCompanyInfo() {
    this.companyService.GetCurrentCompany().subscribe(r => {
      this.companyInfo = r;
    })
  }

  changeDate(event) {
    this.model.RequestDate = event;
    this.getProviders();
  }

  ConvertDateToStringLocal(date) {
    if (date) {
      date = date.replace("Z", "");
      return moment(date).format("MMM D, Y");
    }
    return "";
  }

  getInOutNetworkStatus(provider) {
    if (
      provider &&
      this.insurances &&
      this.insurances.find((x) => x.Status == "Enabled")
    ) {
      return this.insurances.find(
        (x) => provider.PayerCodes && provider.PayerCodes.includes(x.PayerCode)
      )
        ? "In-Network with your insurance"
        : "Out-Network with your insurance";
    }
    return "";
  }

  getPatientProfileEntity() {
    this.pverifyPatientInsuranceService
      .getByPatient(this.model.PatientID)
      .subscribe((r) => {
        this.insurances = r;
      });
  }

  getSlots() {
    this.slot = null;
    this.appointmentSlotService
      .GetAvaiableAppointmentSlots(this.model)
      .subscribe((r) => {
        this.slot = r;
      });
  }

  initState() {
    let currentUser = this.authService.GetCurrentUser();
    if (currentUser?.State) {
      this.model.State = currentUser.State;
    }
  }

  save() {
    if (this.apptCategoryID) {
      this.model.ApptCategoryID = this.apptCategoryID;
      this.authService.requestAppointment = Object.assign({}, this.model);
      this.router.navigate(["../payment"], { relativeTo: this.activeRouter });
    }
  }

  prev() {
    // if (this.isTravelMedicine) {
    //   this.router.navigate(["../choose-countries"], { relativeTo: this.activeRouter });
    // } else {
    //   this.router.navigate(["../insurances"], {
    //     relativeTo: this.activeRouter,
    //   });
    // }
    if (this.isWeightLoss || this.isDiabeticManagement || this.isSkinCare) {
      this.router.navigate(["../reasons"], {
        relativeTo: this.activeRouter,
      });
      return;
    }
    this.router.navigate(["../insurances"], {
      relativeTo: this.activeRouter,
    });
  }

  reset() {
    this.providers = null;
    this.model.ProviderID = null;
    this.model.Gender = this.model.Gender ?? "";
    this.model.AppointmentSlotID = null;
    this.model.AppointmentTime = null;
    this.slot = null;
    this.selectedProvider = null;
    this.model.RequestDate = null;
    this.model.Language = this.model.Language ?? "";
  }

  resetAppt() {
    this.providers = null;
    this.model.ProviderID = null;
    this.model.Gender = this.model.Gender ?? "";
    this.model.AppointmentSlotID = null;
    this.model.AppointmentTime = null;
    this.slot = null;
    this.selectedProvider = null;
    this.model.Language = this.model.Language ?? "";
  }

  checkIsExitPlan() {
    this.getProviders();
    return true;
  }

  getProviders() {
    if (this.model.State) {
      this.resetAppt();
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      this.model.RequestDate = this.model.RequestDate ?? today;
      this.providerProfileService
        .GetRequestProviders(this.model)
        .subscribe((r) => {
          this.providers = r;
          if (this.providers && this.providers.length == 1) {
            this.selectDoctor(this.providers[0]);
          }
          this.convertToImageBadge();
        });
    }
  }

  convertToImageBadge() {
    this.providers.forEach((x) => {
      if (x.Badges) {
        var list = [];
        x.Badges.forEach((y) => {
          list.push({
            image: y,
            thumbImage: y,
            title: "",
          });
        });
        x.ImageBadges = list;
      }
    });
  }

  getCurrentTimezoneInfo() {
    var hours = new Date().getTimezoneOffset() / 60;
    return `${Intl.DateTimeFormat().resolvedOptions().timeZone} UTC (${hours > 0 ? "-" + hours.toString() : hours.toString()
      })`;
  }

  selectDoctor(provider) {
    this.selectedProvider = provider;
    var oldProviderId = this.model.ProviderID;
    this.model.ProviderID = provider.ProviderID;
    this.model.SelectedProvider = provider;

    if (
      oldProviderId != provider.ProviderID &&
      !this.model.IsOnDemand &&
      this.model.RequestDate
    ) {
      this.getSlots();
    }
  }

  selectSlot(slot) {
    this.model.AppointmentSlotID = slot.ID;
    this.model.AppointmentTime = slot.StartTime;
  }

  viewProfile(providerID) {
    this.modal.show(providerID);
  }
}
