import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BaseComponent } from 'src/app/modules/base.component';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CaptureFundInfoModel, ChargeInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';

@Component({
  selector: 'app-capture-funds-modal',
  templateUrl: './capture-funds-modal.component.html',
  styleUrls: ['./capture-funds-modal.component.css']
})
export class CaptureFundsModalComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  model: CaptureFundInfoModel = new CaptureFundInfoModel();
  Submitting: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public authenticateService: AuthenticationService,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService) {
    super(authenticateService);
  }

  ngOnInit() {

  }

  show() {
    this.Submitting = false;
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  save() {
    if (!this.model.IsPartial) {
      this.model.Amount = this.model.Total;
    }

    this.dialog.showSwalConfirmAlert('Are you sure you want to capture fund this credit card?').then(isConfirmed => {
      if (isConfirmed) {
        if (this.model.AppointmentID) {
          this.appointmentService.CapturePaymentIntent(this.model.AppointmentID, this.model.Amount).subscribe(result => {
            if (result) {
              this.authenticateService.onReloadListPaymentHistory.emit(true);
              this.dialog.showSwalSuccesAlert('Capture Fund Payment', MessageConstant.CHARGE_PAYMENT_SUCCESS_CONST);
              this.onClose.emit(true);
              this.hide();
            } else {
              this.Submitting = false;
              this.dialog.showSwalSuccesAlert('Capture Fund Payment', MessageConstant.FAILURE_REQUEST);
            }
          }, error => {
            this.Submitting = false;
            this.dialog.showSwalErrorAlert('Capture Fund Payment', error.error);
          });
        }
      }
    });
  }
}