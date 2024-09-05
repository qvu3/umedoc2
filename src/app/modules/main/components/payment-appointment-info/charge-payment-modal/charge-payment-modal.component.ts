import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { ChargeInfoModel } from 'src/app/modules/common/models/stripe-info.model';

@Component({
  selector: 'app-charge-payment-modal',
  templateUrl: './charge-payment-modal.component.html',
  styleUrls: ['./charge-payment-modal.component.css']
})
export class ChargePaymentModalComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  model: ChargeInfoModel = new ChargeInfoModel();
  Submitting: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  constructor(private appointmentService: AppointmentService,
    private dialog: CommonDialogService) {

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
    this.dialog.showSwalConfirmAlert('Are you sure you want to charge this credit card?').then(isConfirmed => {
      if (isConfirmed) {
        if (this.model.AppointmentID) {
          this.appointmentService.ChargePaymentMethod(this.model).subscribe(result => {
            if (result) {
              this.dialog.showSwalSuccesAlert('Charge Payment', MessageConstant.CHARGE_PAYMENT_SUCCESS_CONST);
              this.onClose.emit(true);
              this.hide();
            } else {
              this.Submitting = false;
              this.dialog.showSwalSuccesAlert('Charge Payment', MessageConstant.FAILURE_REQUEST);
            }
          }, error => {
            this.Submitting = false;
            this.dialog.showSwalErrorAlert('Charge Payment', error.error);
          });
        }
      }
    });
  }
}