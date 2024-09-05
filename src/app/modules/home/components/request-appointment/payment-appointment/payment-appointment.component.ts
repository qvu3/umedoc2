import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AppointmentModel } from 'src/app/modules/common/models/appointment.model';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { UtilityService } from 'src/app/modules/common/services/utility.service';
import Global from 'src/app/Global';
import { AppointmentSlotService } from 'src/app/modules/common/services/appointment-slot.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { CardInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { InsuranceUpdateComponent } from '../../insurance-update/insurance-update.component';
import { CardInfoComponent } from '../../card-info/card-info.component';
import { PatientInsuranceModel } from 'src/app/modules/common/models/patient-insurance.model';
import { PatientInsuranceService } from 'src/app/modules/common/services/patient-insurance.service';
declare var $: any;
declare var gtag: any;

@Component({
  selector: 'app-payment-appointment',
  templateUrl: './payment-appointment.component.html',
  styleUrls: ['./payment-appointment.component.css']
})
export class PaymentAppointmentComponent extends BaseComponent implements OnInit {
  @Input() model: AppointmentModel;
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
  isAddInsurance: boolean = null;
  isExpandedSpecialCode: boolean = false;
  @ViewChild('cardInfoModal') cardInfoModal: CardInfoComponent;
  @ViewChild('insuranceUpdateModal') insuranceUpdateModal: InsuranceUpdateComponent;
  constructor(private appointmentService: AppointmentService,
    private activeRoute: ActivatedRoute,
    private patientProfileService: PatientProfileService,
    public companyService: CompanyService,
    private authService: AuthenticationService,
    private router: Router,
    private utilityService: UtilityService,
    public appointmentSlotService: AppointmentSlotService,
    private dialog: CommonDialogService,
    private patientInsuranceService: PatientInsuranceService
  ) {
    super(authService);
  }

  ngOnInit() {
    this.getPatientProfileEntity();
    this.getCurrentCompanyInfo();
    this.us_statelist = Global.US_StateList;
  }

  setExpandSpecialCode() {
    this.isExpandedSpecialCode = !this.isExpandedSpecialCode;
  }

  addCardInfo() {
    if (this.currentUser) {
      this.cardInfoModal.model = new CardInfoModel();
      this.cardInfoModal.show();
    }
  }

  selectUseInsurance(value) {
    if (!value) {
      this.removeAllInsurance();
    }
    this.isAddInsurance = value;
  }

  addInsurance() {
    if (this.patientModel.PatientID) {
      var pm = new PatientInsuranceModel();
      pm.PatientID = this.patientModel.PatientID;
      this.insuranceUpdateModal.show(pm);
    }
  }

  changeInsurance(id) {
    if (id) {
      this.patientInsuranceService.Get(id).subscribe(r => {
        if (r) {
          this.insuranceUpdateModal.show(r);
        }
      });
    }
  }

  onCloseInsurance(event) {
    if (event) {
      this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
        if (result) {
          this.patientModel.PatientInsurances = result;
        }
      });
    }
  }

  removeAllInsurance() {
    this.patientInsuranceService.RemovedByPatientID(this.patientModel.PatientID).subscribe(r => {
      if (r) {
        this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
          if (result) {
            this.patientModel.PatientInsurances = result;
          }
        });
      }
    });
  }

  removeItemInsurance(id) {
    this.patientInsuranceService.Delete(id).subscribe(r => {
      if (r) {
        this.patientInsuranceService.GetByPatientID(this.patientModel.PatientID).subscribe(result => {
          if (result) {
            this.patientModel.PatientInsurances = result;
          }
        });
      }
    });
  }

  validateInsurance() {
    return !this.isAddInsurance || (this.isAddInsurance && this.patientModel && this.patientModel.PatientInsurances && this.patientModel.PatientInsurances.length > 0);
  }

  getPatientProfileEntity() {
    this.patientModel = new PatientProfileModel();
    this.patientProfileService.GetIncludePatientUser(this.currentUser.Id).subscribe(r => {
      this.patientModel = r;
      if (r.PatientInsurances && r.PatientInsurances.length > 0) {
        this.isAddInsurance = true;
      }
      else if (this.isAddInsurance != null) {
        this.isAddInsurance = false;
      }

      if (this.patientModel.CustomerID && this.patientModel.CardID) {
        this.appointmentService.CheckValidCardInfoAsync(this.patientModel.CustomerID, this.patientModel.CardID).subscribe(c => {
          this.cardInfo = c;
          this.IsShowStripePayment = this.cardInfo.IsShowStripePayment;
        });
      } else {
        this.IsShowStripePayment = true;
      }

      // Set insurance of Patient for request
      if (this.patientModel.PatientUser && !this.patientModel.PatientUser.ProfilePicture) {
        this.patientModel.PatientUser.ProfilePicture = "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";;
      }

    });
  }

  raiseRefresh() {
    this.utilityService.needRefreshProvider();
  }

  funcCheckCode() {
    if (!this.model.ByPassPaymentCode) {
      return;
    }

    this.isDiscountCodeError = true;
    this.isClickApply = true;
    this.IsChecking = true;
    this.companyService.CheckDiscountCode(this.model.ByPassPaymentCode).subscribe(r => {
      this.isDiscountCodeError = r;
      this.IsChecking = false;
    });
  }

  getCurrentCompanyInfo() {
    this.companyModel = new CompanyModel();
    this.companyService.Get(this.currentUser.CompanyID).subscribe(r => {
      this.companyModel = r;
      if (this.companyModel && !this.companyModel.CompanyPicture) {
        this.companyModel.CompanyPicture = "https://via.placeholder.com/400x600.png";;
      }
    });
  }

  save() {
    if (!this.validateInsurance()) {
      this.dialog.showToastrError('Insurance', 'Please add your insurance');
      return;
    }
    this.IsSubmitting = true;
    if (!this.isDiscountCodeError) {

      // Set by pass payment for stripe
      this.model.IsCharge = false;

      // check appointment slot is available
      if (this.model.IsOnDemand) {
        this.appointmentService.PatientAppointmentByPassPayment(this.model).subscribe(r => {
          this.IsSubmitting = false;
          if (r && r.ID) {
            this.runGoogleAds();
            this.router.navigate([`/appointment-room/${r.ID}`]);
          }
        }, error => {
          this.dialog.showSwalErrorAlert("Error", error.error);
        });
      } else {
        this.appointmentSlotService.CheckAvailableAppointSlot(this.model).subscribe(k => {
          if (k) {
            this.appointmentService.PatientAppointmentByPassPayment(this.model).subscribe(r => {
              this.IsSubmitting = false;
              if (r && r.ID) {
                this.runGoogleAds();
                this.router.navigate([`/appointment-room/${r.ID}`]);
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
  }

  generateReasonAssignment(listReasonAssignment) {
    if (listReasonAssignment && listReasonAssignment.length > 0) {
      let str = "";
      listReasonAssignment.forEach((ele, index) => {
        if (ele.AppointmentReason) {
          str += index > 0 ? ', ' + ele.AppointmentReason.ReasonName : ele.AppointmentReason.ReasonName;
        }
      });
      return str;
    }
  }

  paymentSubmitted() {
    $("#btnSubmit").click();
    return false;
  }

  paymentSave() {
    if (!this.validateInsurance()) {
      this.dialog.showToastrError('Insurance', 'Please add your insurance');
      return;
    }
    if (!this.model.IsReadAndAgreedTreatment) return;
    // check appointment slot is available
    this.model.IsCharge = true;
    if (this.model.IsOnDemand) {
      this.appointmentService.SaveRequestAppointmentByCustomerAndCard(this.model).subscribe(r => {
        this.IsSubmitting = false;
        if (r && r.ID) {
          this.runGoogleAds();
          this.router.navigateByUrl(`/appointment-room/${r.ID}`);
        }
      }, error => {
        this.dialog.showSwalErrorAlert("Error", error.error);
      });
    } else {
      this.appointmentSlotService.CheckAvailableAppointSlot(this.model).subscribe(k => {
        if (k) {
          this.appointmentService.SaveRequestAppointmentByCustomerAndCard(this.model).subscribe(r => {
            this.IsSubmitting = false;
            if (r && r.ID) {
              this.runGoogleAds();
              this.router.navigateByUrl(`/appointment-room/${r.ID}`);
            }
          }, error => {
            this.dialog.showSwalErrorAlert("Error", error.error);
          });
        } else {
          this.dialog.showSwalErrorAlert("Error", "Appointment slot is unavailable. Please select another slot.");
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

  calculateAppointmentPrice() {
    let appointmentPrice = 0;
    // Case use insurance
    if (this.isAddInsurance) {
      let sumPatientCopy = 0;
      this.patientModel.PatientInsurances.forEach(element => {
        if (element.DontKnowCopay === false) {
          sumPatientCopy += element.PatientCopay;
        }
      });

      appointmentPrice = sumPatientCopy;
    } else {
      if (this.isClickApply && !this.isDiscountCodeError) {
        appointmentPrice = 0;
      } else {
        appointmentPrice = this.companyModel.AppointmentPrice;
      }
    }

    return appointmentPrice;
  }

  runGoogleAds() {
    gtag('event', 'conversion', {'send_to': 'AW-638647302/D2J9CNPHo-EBEIb4w7AC'});
  }
}
