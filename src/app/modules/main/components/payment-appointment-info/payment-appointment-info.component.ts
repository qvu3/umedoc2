import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import TransactionPaypalModel from 'src/app/modules/common/models/transaction-paypal.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { RefundPaymentComponent } from '../refund-payment/refund-payment.component';
import { RefundInfoModel } from 'src/app/modules/common/models/paypal-refund.model';
import StripeTransactionInfoModel from 'src/app/modules/common/models/stripe-transaction-info.model';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ChargeInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { ChargePaymentModalComponent } from './charge-payment-modal/charge-payment-modal.component';
import { CompanyService } from 'src/app/modules/common/services/company.service';
import { CompanyModel } from 'src/app/modules/common/models/company.model';
import { CaptureFundsModalComponent } from './capture-funds-modal/capture-funds-modal.component';

@Component({
  selector: 'app-payment-appointment-info',
  templateUrl: './payment-appointment-info.component.html',
  styleUrls: ['./payment-appointment-info.component.css']
})
export class PaymentAppointmentInfoComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() appointmentId: string;
  @ViewChild('modal') modal: RefundPaymentComponent;
  @ViewChild('chargeModal') chargeModal: ChargePaymentModalComponent;
  @ViewChild('captureModal') captureModal: CaptureFundsModalComponent;
  model: StripeTransactionInfoModel = new StripeTransactionInfoModel();
  companyInfo: CompanyModel = new CompanyModel();
  constructor(public authService: AuthenticationService,
    private dialog: CommonDialogService,
    private appointmentService: AppointmentService,
    private companyService: CompanyService) {
    super(authService);
  }

  ngOnInit() {
  }

  refund() {
    if (this.model && this.model.PaymentID && this.model.Amount) {
      this.modal.model = new RefundInfoModel();
      this.modal.model.SaleID = this.model.PaymentID;
      this.modal.model.Total = this.model.Amount;
      //this.modal.model.Amount = 0;
      this.modal.show();
    }
  }

  ngOnChanges(params: SimpleChanges) {
    if (params && params.appointmentId
      && params.appointmentId.currentValue
      && params.appointmentId.currentValue != params.appointmentId.previousValue) {
      this.getEntity();
    }
  }

  getEntity() {
    if (this.appointmentId) {
      //this.model = null;
      this.appointmentService.GetPaymentStripeInfo(this.appointmentId).subscribe(r => {
        if (r) {
          this.model = r;
        }
      });
    }
  }

  chargePayment() {
    if (this.appointmentId) {
      this.companyService.GetById(this.currentUser.CompanyID).subscribe(r => {
        if (r) {
          this.companyInfo = r;
          this.chargeModal.model = new ChargeInfoModel();
          this.chargeModal.model.AppointmentID = this.appointmentId;
          this.chargeModal.model.Amount = this.companyInfo.AppointmentPrice;
          this.chargeModal.model.Total = this.companyInfo.AppointmentPrice + 1;
          this.chargeModal.show();
        }
      });
    }
  }

  captureFund() {
    this.captureModal.model.Total = this.model.Amount;
    this.captureModal.model.IsPartial = false;
    this.captureModal.model.AppointmentID = this.appointmentId;;
    this.captureModal.show();
  }

  cancelTheHold() {
    this.dialog.showSwalConfirmAlert('Are you sure you want to cancel the hold?').then(isConfirmed => {
      if (isConfirmed) {
        if (this.appointmentId) {
          this.appointmentService.CancelledPaymentIntent(this.appointmentId).subscribe(result => {
            if (result) {
              this.dialog.showSwalSuccesAlert('Cancelled Payment', MessageConstant.CHARGE_PAYMENT_SUCCESS_CONST);
              this.getEntity();

              // Reload list payment history list
              this.authService.onReloadListPaymentHistory.emit(true);
            } else {
              this.dialog.showSwalSuccesAlert('Cancelled Payment', MessageConstant.FAILURE_REQUEST);
            }
          }, error => {
            this.dialog.showSwalErrorAlert('Cancelled Payment', error.error);
          });
        }
      }
    });
  }
}

