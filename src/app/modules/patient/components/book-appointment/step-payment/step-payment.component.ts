import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/modules/base.component";
import { MessageConstant } from "src/app/modules/common/constant/message.const";
import { AppointmentModel } from "src/app/modules/common/models/appointment.model";
import { CompanyModel } from "src/app/modules/common/models/company.model";
import { PatientProfileModel } from "src/app/modules/common/models/patient-profile.model";
import { PverifyPatientInsuranceModel } from "src/app/modules/common/models/pverify-patient-insurance.model";
import { CardInfoModel } from "src/app/modules/common/models/stripe-info.model";
import { AppointmentSlotService } from "src/app/modules/common/services/appointment-slot.service";
import { AppointmentService } from "src/app/modules/common/services/appointment.service";
import { AuthenticationService } from "src/app/modules/common/services/authentication.service";
import { CompanyService } from "src/app/modules/common/services/company.service";
import { CommonDialogService } from "src/app/modules/common/services/dialog.service";
import { PatientInsuranceService } from "src/app/modules/common/services/patient-insurance.service";
import { PatientProfileService } from "src/app/modules/common/services/patient-profile.service";
import { PatientSubscriptionService } from "src/app/modules/common/services/patient-subscription.service";
import { PverifyPatientInsuranceService } from "src/app/modules/common/services/pverify-patient-insurance.service";
import { UtilityService } from "src/app/modules/common/services/utility.service";
import { CardInfoComponent } from "src/app/modules/home/components/card-info/card-info.component";
import { environment } from "src/environments/environment";
declare var $: any;
declare var gtag: any;

@Component({
  selector: "app-step-payment",
  templateUrl: "./step-payment.component.html",
  styleUrls: ["./step-payment.component.css"],
})
export class StepPaymentComponent extends BaseComponent implements AfterViewInit {
  model: AppointmentModel = new AppointmentModel();
  @Input() routerName: string;
  newModel: AppointmentModel;
  @Input() isNeedLoad: boolean;
  companyModel: CompanyModel;
  patientModel: PatientProfileModel;
  isDiscountCodeError: boolean = true;
  isClickApply: boolean = false;
  isClickInsuranceApply: boolean = false;
  IsCheckingInsurance: boolean = false;
  IsSubmitting: boolean = false;
  IsChecking: boolean = false;
  currentDate: Date = new Date();
  us_statelist: any;
  IsShowStripePayment: boolean = false;
  IsChangeCardInfo: boolean = false;
  cardInfo: CardInfoModel = new CardInfoModel();
  isExpandedSpecialCode: boolean = false;
  @ViewChild("cardInfoModal") cardInfoModal: CardInfoComponent;
  apptCategoryID: string;
  insurances: PverifyPatientInsuranceModel[] = [];
  isTravelMedicine: boolean = false;
  isWeightLoss: boolean = false;
  isDiabeticManagement: boolean = false;
  isSkinCare: boolean = false;
  isFitness: boolean = false;
  isValidPatientSubscription: boolean = false;
  showPreAuthMessage: boolean = false;
  isShowCoupon: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private router: Router,
    private patientProfileService: PatientProfileService,
    public companyService: CompanyService,
    private utilityService: UtilityService,
    public appointmentSlotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private patientInsuranceService: PatientInsuranceService,
    private pverifyPatientInsuranceService: PverifyPatientInsuranceService,
    private activeRouter: ActivatedRoute,
    private cdChanged: ChangeDetectorRef,
    private patientSubscription: PatientSubscriptionService
  ) {
    super(authService);
    this.activeRouter.parent.params.subscribe((r) => {
      this.isTravelMedicine =
        r && r["category"] && r["category"].toLowerCase() === "travel_medicine";
      this.isWeightLoss = r && r["category"] && r["category"].toLowerCase() === "weight_loss_consultation";
      this.isDiabeticManagement = r && r['category'] && r['category'].toLowerCase() === 'diabetic_management';
      this.isSkinCare = r && r['category'] && r['category'].toLowerCase() === 'skin_care';
      this.isFitness = r && r['category'] && r['category'].toLowerCase() === 'fitness';
    });
    this.authService.onLoadCategoryIDEvent.subscribe((r) => {
      this.apptCategoryID = r;
    });
  }

  ngAfterViewInit(): void {
    this.model = this.authService.requestAppointment;
    this.getPatientProfileEntity();
    this.getCurrentCompanyInfo();
    this.checkConditionPayCoin();
    this.checkPatientHasValidSubscription();
  }

  getPatientProfileEntity() {
    this.patientModel = new PatientProfileModel();
    this.pverifyPatientInsuranceService
      .getByPatient(this.model?.PatientID)
      .subscribe((r) => {
        if (r) {
          this.insurances = r;
          this.selectPaidByInsurance(true);
        } else {
          this.insurances = [];
          this.selectPaidByInsurance(false);
        }
        // if (r && !this.isTravelMedicine) {
        //   this.insurances = r;
        //   this.selectPaidByInsurance(true);
        // }
        // else {
        //   this.insurances = [];
        //   this.selectPaidByInsurance(false);
        // }
      });

    this.patientProfileService
      .GetIncludePatientUser(this.currentUser.Id)
      .subscribe((r) => {
        this.patientModel = r;

        if (this.patientModel.CustomerID && this.patientModel.CardID) {
          this.appointmentService
            .CheckValidCardInfoAsync(
              this.patientModel.CustomerID,
              this.patientModel.CardID
            )
            .subscribe((c) => {
              this.cardInfo = c;
              this.IsShowStripePayment = this.cardInfo.IsShowStripePayment;
            });
        } else {
          this.IsShowStripePayment = true;
        }
      });
  }

  getCurrentCompanyInfo() {
    this.companyModel = new CompanyModel();
    this.companyService.Get(this.currentUser.CompanyID).subscribe((r) => {
      this.companyModel = r;
      if (this.companyModel && !this.companyModel.CompanyPicture) {
        this.companyModel.CompanyPicture =
          "https://via.placeholder.com/400x600.png";
      }
    });
  }

  setExpandSpecialCode() {
    this.isExpandedSpecialCode = !this.isExpandedSpecialCode;
  }

  canChangePaidByInsurance() {
    if (this.insurances && this.insurances.length > 0) {
      var takeMedicare =
        this.model?.SelectedProvider?.TakeMedicare &&
        this.insurances.filter(
          (c) =>
            c.InsuranceType == "Primary" &&
            c.Status == "Enabled" &&
            c.PayerName.includes("Medicare")
        ).length > 0;

      var takeMedicaid =
        this.model?.SelectedProvider?.TakeMedicaid &&
        this.insurances.filter(
          (c) =>
            c.InsuranceType == "Primary" &&
            c.Status == "Enabled" &&
            c.PayerName.includes("Medicaid")
        ).length > 0;

      var takeInsurance =
        this.model?.SelectedProvider?.TakeInsurance &&
        this.insurances.filter(
          (c) =>
            c.InsuranceType == "Primary" &&
            c.Status == "Enabled" &&
            !c.PayerName.includes("Medicaid") &&
            !c.PayerName.includes("Medicare")
        ).length > 0;



      return (takeMedicare || takeMedicaid || takeInsurance) && !this.isWeightLoss && !this.isDiabeticManagement && !this.isSkinCare;
    }

    return false;
  }

  selectPaidByInsurance(value) {
    this.model.PaidByInsurance = null;
    if (this.insurances?.length > 0) {
      if (this.canChangePaidByInsurance()) {
        this.model.PaidByInsurance = value;
      } else {
        this.model.PaidByInsurance = false;
      }
    } else {
      this.model.PaidByInsurance = false;
    }

    this.cdChanged.detectChanges();
  }

  addCardInfo() {
    if (this.currentUser) {
      this.cardInfoModal.model = new CardInfoModel();
      this.cardInfoModal.show();
    }
  }

  funcCheckCode() {
    if (!this.model.ByPassPaymentCode) {
      return;
    }

    this.isDiscountCodeError = true;
    this.isClickApply = true;
    this.IsChecking = true;
    this.companyService
      .CheckDiscountCode(this.model.ByPassPaymentCode)
      .subscribe((r) => {
        this.isDiscountCodeError = r;
        this.IsChecking = false;
      });
  }

  save() {
    if (!this.apptCategoryID) return;
    this.model.ApptCategoryID = this.apptCategoryID;
    this.authService.requestAppointment = Object.assign({}, this.model);

    if (!this.validateInsurance()) {
      this.dialog.showToastrError("Insurance", "Please add your insurance");
      return;
    }
    this.IsSubmitting = true;
    if (!this.isDiscountCodeError) {
      // Set by pass payment for stripe
      this.model.IsCharge = false;

      // check appointment slot is available
      if (this.model.IsOnDemand) {
        this.appointmentService
          .PatientAppointmentByPassPayment(this.model)
          .subscribe(
            (r) => {
              this.IsSubmitting = false;
              if (r && r.ID) {
                this.authService.removeRequestAppointment();
                this.router.navigate([`/appointment-room/${r.ID}`]);
              }
            },
            (error) => {
              this.dialog.showSwalErrorAlert("Error", error.error);
              if (error.error.includes("Provider no longer")) {
                this.router.navigate(["../choose-provider"], {
                  relativeTo: this.activeRouter,
                });
              }
            }
          );
      } else {
        this.appointmentSlotService
          .CheckAvailableAppointSlot(this.model)
          .subscribe((k) => {
            if (k) {
              this.appointmentService
                .PatientAppointmentByPassPayment(this.model)
                .subscribe(
                  (r) => {
                    this.IsSubmitting = false;
                    if (r && r.ID) {
                      this.authService.removeRequestAppointment();
                      this.router.navigate([`/appointment-room/${r.ID}`]);
                    }
                  },
                  (error) => {
                    this.dialog.showSwalErrorAlert("Error", error.error);
                  }
                );
            } else {
              this.dialog.showSwalErrorAlert(
                "Error",
                "Appointment slot is unavailable. Please select another slot."
              );
            }
          });
      }
    }
  }

  prev() {
    this.router.navigate(["../choose-provider"], {
      relativeTo: this.activeRouter,
    });
  }

  changeInsurance(event) {
    this.insurances = event;
    this.selectPaidByInsurance(true);
    if (this.insurances.length == 0) {
      this.model.isAddInsurance = false;
    }
  }

  hasEnableInsurance() {
    return (
      this.insurances.length > 0 &&
      this.insurances.find(
        (x) => x.InsuranceType == "Primary" && x.Status == "Enabled"
      )
    );
  }

  validateInsurance() {
    return (
      !this.model.isAddInsurance ||
      (this.model.isAddInsurance && this.hasEnableInsurance())
    );
  }

  paymentSave() {
    if (!this.apptCategoryID) return;
    this.IsSubmitting = true;
    this.model.ApptCategoryID = this.apptCategoryID;
    this.authService.requestAppointment = Object.assign({}, this.model);

    if (!this.validateInsurance()) {
      this.dialog.showToastrError("Insurance", "Please add your insurance");
      this.IsSubmitting = false;
      return;
    }
    if (!this.model.IsReadAndAgreedTreatment) {
      return;
    }

    // check appointment slot is available
    this.model.IsCharge = true;
    if (this.model.IsOnDemand) {
      if (!this.model.PayByCrypto) {
        this.appointmentService
          .SaveRequestAppointmentByCustomerAndCard(this.model)
          .subscribe(
            (r) => {
              this.IsSubmitting = false;
              if (r && r.ID) {
                this.runGoogleAds();
                this.runBingAds();
                this.authService.removeRequestAppointment();
                this.router.navigateByUrl(`/appointment-room/${r.ID}`);
              }
            },
            (error) => {
              this.dialog.showSwalErrorAlert("Error", error.error);
              if (error.error.includes("Provider no longer")) {
                this.router.navigate(["../choose-provider"], {
                  relativeTo: this.activeRouter,
                });
              }
            }
          );
      } else {
        this.appointmentService
          .SaveRequestAppointmentByCustomerAndCardByCoin(this.model)
          .subscribe(
            (r) => {
              this.IsSubmitting = false;
              if (r && r.ID) {
                this.runGoogleAds();
                this.runBingAds();
                this.authService.removeRequestAppointment();
                window.location.href = `${environment.coinbaseUrl}/${r.CoinBaseChargeID}`;
              }
            },
            (error) => {
              this.dialog.showSwalErrorAlert("Error", error.error);
              if (error.error.includes("Provider no longer")) {
                this.router.navigate(["../choose-provider"], {
                  relativeTo: this.activeRouter,
                });
              }
            }
          );
      }
    } else {
      this.appointmentSlotService
        .CheckAvailableAppointSlot(this.model)
        .subscribe((k) => {
          if (k) {
            if (!this.model.PayByCrypto) {
              this.appointmentService
                .SaveRequestAppointmentByCustomerAndCard(this.model)
                .subscribe(
                  (r) => {
                    this.IsSubmitting = false;
                    if (r && r.ID) {
                      this.runGoogleAds();
                      this.runBingAds();
                      this.authService.removeRequestAppointment();
                      this.router.navigateByUrl(`/appointment-room/${r.ID}`);
                    }
                  },
                  (error) => {
                    this.dialog.showSwalErrorAlert("Error", error.error);
                  }
                );
            } else {
              this.appointmentService
                .SaveRequestAppointmentByCustomerAndCardByCoin(this.model)
                .subscribe(
                  (r) => {
                    this.IsSubmitting = false;
                    if (r && r.ID) {
                      this.runGoogleAds();
                      this.runBingAds();
                      this.authService.removeRequestAppointment();
                      window.location.href = `${environment.coinbaseUrl}/${r.CoinBaseChargeID}`;
                    }
                  },
                  (error) => {
                    this.dialog.showSwalErrorAlert("Error", error.error);
                  }
                );
            }
          } else {
            this.dialog.showSwalErrorAlert(
              "Error",
              "Appointment slot is unavailable. Please select another slot."
            );
          }
        });
    }
  }

  changeCard() {
    this.IsChangeCardInfo = true;
    this.IsShowStripePayment = true;
  }

  cancelChangeCard() {
    this.IsChangeCardInfo = false;
    this.IsShowStripePayment = false;
  }

  checkInNetworkStatus(provider) {
    if (
      provider &&
      this.insurances &&
      this.insurances.find(
        (x) => x.InsuranceType == "Primary" && x.Status == "Enabled"
      )
    ) {
      var result = this.insurances.find(
        (x) =>
          x.InsuranceType == "Primary" &&
          x.Status == "Enabled" &&
          provider.PayerCodes &&
          provider.PayerCodes.includes(x.PayerCode)
      );
      return result ? true : false;
    }
    return false;
  }

  isUseDontknowCopay: boolean = false;
  dontKnowCopayParam = { value: 0 };

  checkConditionPayCoin() {
    if (this.model.PayByCrypto && !this.model.IsOnDemand) {
      this.model.PayByCrypto = false;
      this.cdChanged.detectChanges();
    }
  }

  calculateAppointmentPrice() {
    this.isUseDontknowCopay = false;
    let appointmentPrice = 0;
    if (this.hasEnableInsurance() && this.model.PaidByInsurance) {
      // Case use insurance
      if (this.insurances?.length > 0) {
        // Apply new business for item #486
        var enableInsurances = this.insurances.filter(
          (item) => item.Status == "Enabled" && item.InsuranceType == "Primary"
        );
        var firstEnableInsurance = enableInsurances[0];
        if (firstEnableInsurance.ChargeFullAmount) {
          appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
          this.showPreAuthMessage = true;
        } else {
          if (
            !firstEnableInsurance.FinalCopay == null ||
            firstEnableInsurance.FinalCopay <= 0
          ) {
            var histories = firstEnableInsurance?.PverifyCheckHistories;
            if (histories && histories.length > 0) {
              var lastHistory = histories.sort((d1, d2) => {
                return (
                  new Date(d2.DateOfService).getTime() -
                  new Date(d1.DateOfService).getTime()
                );
              })[0];

              // Check condition ContractedServiceProvider
              if (
                lastHistory.ContractedServiceProvider &&
                lastHistory.ContractedServiceProvider !== ""
              ) {
                this.isUseDontknowCopay = true;
                this.dontKnowCopayParam = {
                  value: this.companyModel.DontKnowCopayPrice ?? 0,
                };
                appointmentPrice = this.companyModel.DontKnowCopayPrice;
              } else {
                if (this.checkInNetworkStatus(this.model.SelectedProvider)) {
                  var copayInNet = lastHistory.CoPayInNet ?? -1;
                  var coInsInNet = lastHistory.CoInsInNet ?? -1;

                  if (coInsInNet == 100) {
                    appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
                  } else {
                    if (copayInNet >= 0) {
                      appointmentPrice = copayInNet;
                    } else {
                      this.isUseDontknowCopay = true;
                      this.dontKnowCopayParam = {
                        value: this.companyModel.DontKnowCopayPrice ?? 0,
                      };
                      appointmentPrice = this.companyModel.DontKnowCopayPrice;
                    }
                  }
                } else {
                  // If in case Provider not in Network. Check PverifyInsurance IsHMOPlan
                  // If true value set appointmentFee = providerPrice
                  if (lastHistory.IsHMOPlan) {
                    appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
                  } else {
                    var copayOutNet = lastHistory.CoPayOutNet ?? -1;
                    var coInsOutNet = lastHistory.CoInsOutNet ?? -1;
                    if (coInsOutNet == 100) {
                      appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
                    } else {
                      if (copayOutNet >= 0) {
                        appointmentPrice = copayOutNet;
                      } else {
                        this.isUseDontknowCopay = true;
                        this.dontKnowCopayParam = {
                          value: this.companyModel.DontKnowCopayPrice ?? 0,
                        };
                        appointmentPrice = this.companyModel.DontKnowCopayPrice;
                      }
                    }
                  }
                }
              }
            } else {
              this.isUseDontknowCopay = true;
              this.dontKnowCopayParam = {
                value: this.companyModel.DontKnowCopayPrice ?? 0,
              };
              appointmentPrice = this.companyModel.DontKnowCopayPrice;
            }
          } else {
            appointmentPrice = firstEnableInsurance.FinalCopay;
          }
        }

      } else {
        if (this.isClickApply && !this.isDiscountCodeError) {
          appointmentPrice = 0;
        } else {
          appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
        }
      }
    } else {
      appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
    }
    if (this.model.Countries && this.model.Countries.length > 1) {
      appointmentPrice += (60 * (this.model.Countries.length - 1));
    }
    return appointmentPrice;
  }

  calculateAppointmentPriceBackup() {
    this.isUseDontknowCopay = false;
    let appointmentPrice = 0;
    if (this.hasEnableInsurance() && this.model.PaidByInsurance) {
      // Case use insurance
      if (this.insurances?.length > 0) {
        // Apply new business for item #486
        var enableInsurances = this.insurances.filter(
          (item) => item.Status == "Enabled" && item.InsuranceType == "Primary"
        );

        var firstEnableInsurance = enableInsurances[0];

        var histories = firstEnableInsurance?.PverifyCheckHistories;

        if (this.checkInNetworkStatus(this.model.SelectedProvider)) {
          // Check Final Copay value
          if (firstEnableInsurance.FinalCopay == null) {
            if (histories && histories.length > 0) {
              var lastestHistory = histories.sort((d1, d2) => {
                return (
                  new Date(d2.DateOfService).getTime() -
                  new Date(d1.DateOfService).getTime()
                );
              })[0];

              var copayInNet = lastestHistory.CoPayInNet ?? -1;
              var coInsNet = lastestHistory.CoInsInNet ?? -1;

              if (coInsNet == 100) {
                appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
              } else {
                if (copayInNet >= 0) {
                  appointmentPrice = copayInNet;
                } else {
                  this.isUseDontknowCopay = true;
                  this.dontKnowCopayParam = {
                    value: this.companyModel.DontKnowCopayPrice ?? 0,
                  };
                  appointmentPrice = this.companyModel.DontKnowCopayPrice;
                }
              }
            } else {
              this.isUseDontknowCopay = true;
              this.dontKnowCopayParam = {
                value: this.companyModel.DontKnowCopayPrice ?? 0,
              };
              appointmentPrice = this.companyModel.DontKnowCopayPrice;
            }
          } else {
            appointmentPrice = firstEnableInsurance.FinalCopay;
          }
        } else {
          // Check Final Copay value
          if (firstEnableInsurance.FinalCopay == null) {
            if (histories && histories.length > 0) {
              var lastestHistory = histories.sort((d1, d2) => {
                return (
                  new Date(d2.DateOfService).getTime() -
                  new Date(d1.DateOfService).getTime()
                );
              })[0];

              var copayOutNet = lastestHistory.CoPayOutNet ?? -1;
              var coInsOutNet = lastestHistory.CoInsOutNet ?? -1;

              if (coInsOutNet == 100) {
                appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
              } else {
                if (copayOutNet >= 0) {
                  appointmentPrice = copayOutNet;
                } else {
                  this.isUseDontknowCopay = true;
                  this.dontKnowCopayParam = {
                    value: this.companyModel.DontKnowCopayPrice ?? 0,
                  };
                  appointmentPrice = this.companyModel.DontKnowCopayPrice;
                }
              }
            } else {
              this.isUseDontknowCopay = true;
              this.dontKnowCopayParam = {
                value: this.companyModel.DontKnowCopayPrice ?? 0,
              };
              appointmentPrice = this.companyModel.DontKnowCopayPrice;
            }
          } else {
            appointmentPrice = firstEnableInsurance.FinalCopay;
          }
        }
      } else {
        if (this.isClickApply && !this.isDiscountCodeError) {
          appointmentPrice = 0;
        } else {
          appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
        }
      }
    } else {
      appointmentPrice = this.model?.SelectedProvider?.Price ?? 0;
    }

    return appointmentPrice;
  }

  caculateTotalFianlAppointmentPrice() {
    let appointmentFee = 0.0;

    // set default appointment price
    appointmentFee = this.calculateAppointmentPrice();

    // Check if PortalFee has value. Adding Fee into appointment Price
    if (this.companyModel.PortalFee && this.companyModel.PortalFee > 0) {
      appointmentFee += this.isValidPatientSubscription ? 0 : this.companyModel.PortalFee;
    }

    return appointmentFee.toFixed(2);
  }

  paymentSubmitted() {
    $("#btnSubmit").click();
    return false;
  }

  runGoogleAds() {
    gtag("event", "conversion", {
      send_to: "AW-638647302/D2J9CNPHo-EBEIb4w7AC",
    });
  }

  runBingAds() {
    window.uetq = window.uetq || [];
    window.uetq.push("event", "RequestedAppt", {
      event_category: "RequestedAppt",
      event_label: "RequestedAppt",
      event_value: 1,
    });
  }

  selectTreatmentConsent() {
    let lang = sessionStorage.getItem("lang") ?? "en";
    if (lang && lang == "es") {
      return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Treatment%2BConsent+-+Spanish+Version.docx.pdf";
    }
    return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Treatment+Consent.pdf";
  }

  selectBillingConsent() {
    let lang = sessionStorage.getItem("lang") ?? "en";
    if (lang && lang == "es") {
      return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Billing-Consent-Spanish-Version.pdf";
    }
    return "https://umedoc-prod.s3.amazonaws.com/RandomFiles/Patient+billing+consent.pdf";
  }

  checkPatientHasValidSubscription() {
    this.patientSubscription.CheckExistsPlanInPatientUser(this.currentUser.Id).subscribe(r => {
      this.isValidPatientSubscription = r;
    });
  }
}
