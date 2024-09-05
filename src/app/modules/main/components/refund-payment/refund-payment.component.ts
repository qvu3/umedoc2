import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { RefundInfoModel } from 'src/app/modules/common/models/paypal-refund.model';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { BaseComponent } from 'src/app/modules/base.component';

@Component({
  selector: 'app-refund-payment',
  templateUrl: './refund-payment.component.html',
  styleUrls: ['./refund-payment.component.css']
})
export class RefundPaymentComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') modal: ModalDirective;
  model: RefundInfoModel = new RefundInfoModel();
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
    this.Submitting = true;
    if (!this.model.IsPartial) {
      this.model.Amount = this.model.Total;
    }

    this.appointmentService.RefundStripeAppointment(this.model).subscribe(r => {
      this.Submitting = false;
      if (r) {
        this.onClose.emit(true);
        this.authenticateService.onReloadListPaymentHistory.emit(true);
        this.hide();
        this.dialog.showSwalSuccesAlert('Refund', MessageConstant.EDIT_SCCCESS_CONST);
      }
    }, error => {
      this.Submitting = false;
      this.dialog.showSwalErrorAlert('Refund', MessageConstant.FAILURE_REQUEST);
    })
  }
}

