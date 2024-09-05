import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { InsuranceBalanceBillingModel } from 'src/app/modules/common/models/balance-billing.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { CardInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { CardInfoComponent } from '../card-info/card-info.component';

@Component({
  selector: 'app-insurance-balance-billing',
  templateUrl: './insurance-balance-billing.component.html',
  styleUrls: ['./insurance-balance-billing.component.css']
})
export class InsuranceBalanceBillingComponent extends BaseComponent implements OnInit {
  id: string;
  model: InsuranceBalanceBillingModel;
  IsShowStripePayment: boolean = false;
  IsChangeCardInfo: boolean = false;
  cardInfo: CardInfoModel = new CardInfoModel();
  patientId: string;
  @ViewChild('cardInfoModal') cardInfoModal: CardInfoComponent;
  patientModel = new PatientProfileModel();

  constructor(authService: AuthenticationService,
    activeRouter: ActivatedRoute,
    private dialog: CommonDialogService,
    private insuranceBalanceService: BalanceBillingService,
    private patientProfileService: PatientProfileService,
    private appointmentService: AppointmentService,
    private router: Router) {
    super(authService);
    activeRouter.params.subscribe(r => {
      if (r && r['{id}']) {
        this.id = r['{id}'];
        this.getEntity(this.id);
        this.getPatientProfileEntity();
      }
      else {
        this.dialog.showSwalErrorAlert('Insurance Balance Billing', 'Insurance Balance Billing Url is invaild, please check your email to get corrected link');
        this.router.navigateByUrl('/');
      }
    })
  }

  ngOnInit(): void {
  }

  payNow() {
    if (this.model && this.model.ID && !this.model.IsPaid) {
      this.insuranceBalanceService.payNow(this.model.ID).subscribe(r => {
        this.dialog.showSwalSuccesAlert('Insurance Balance Billing', 'Your payment is execute successfuly');
        this.router.navigateByUrl('/');
      }, error => {
        this.dialog.showSwalErrorAlert('Insurance Balance Billing', MessageConstant.FAILURE_REQUEST);
      })
    }
  }

  getEntity(id) {
    this.insuranceBalanceService.Get(id).subscribe(r => {
      this.model = r;
    }, error => {
      this.dialog.showSwalWarningAlert('Insurance Balance Billing', 'This Insurance Balance Bill did not existed.');
      this.router.navigateByUrl('/');
    });
  }

  addCardInfo() {
    if (this.patientModel && this.patientModel.PatientID) {
      this.cardInfoModal.model = new CardInfoModel(); 
      this.cardInfoModal.show(this.patientModel.PatientID);
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

  getPatientProfileEntity() {
    if (!this.id) return;
    this.patientModel = new PatientProfileModel();
    this.insuranceBalanceService.getPatientInfo(this.id).subscribe(r => {
      this.patientModel = r;
      this.cardInfo = r.CardInfo;
      this.IsShowStripePayment = this.cardInfo?.IsShowStripePayment ?? true;
    });

  }

  checkDisablePayNow() {
    return !this.model || !this.model.ID || !this.patientModel || !this.patientModel.CardInfo
      || !this.patientModel.CustomerID || !this.patientModel.CardID;
  }
}
