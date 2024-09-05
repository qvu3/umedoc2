import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import Global from 'src/app/Global';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { AppointmentService } from 'src/app/modules/common/services/appointment.service';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { CardInfoModel } from 'src/app/modules/common/models/stripe-info.model';
import { PatientProfileModel } from 'src/app/modules/common/models/patient-profile.model';
import { PatientProfileService } from 'src/app/modules/common/services/patient-profile.service';
import { BalanceBillingService } from 'src/app/modules/common/services/balance-billing.service';

declare var Stripe: any;
declare var $: any;

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('childModal') public modal: ModalDirective;
  @ViewChild('checkout') public form: NgForm;
  @Input() isBilling: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  model: CardInfoModel = new CardInfoModel();
  patientModel: PatientProfileModel = new PatientProfileModel();
  isError: boolean = false;
  error: string = "";
  constructor(private authenticaService: AuthenticationService,
    private dialog: CommonDialogService,
    private balanceBillingService: BalanceBillingService,
    private patientProfileService: PatientProfileService,
    private cd: ChangeDetectorRef) {
    super(authenticaService);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {

  }



  async onSubmit(form: NgForm) {
    this.error = "";
    this.isError = false;
    if (this.isBilling) {
      this.balanceBillingService.createOrUpdateCardInfo(this.model).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess("Save Credit Card", MessageConstant.REQUEST_SUCCESS_CONST);
          this.closeModal.emit(true);
          this.hide();
        } else {
          this.dialog.showSwalErrorAlert("Error", MessageConstant.FAILURE_REQUEST);
        }
      }, error => {
        this.isError = true;
        this.error = error.error;
      });
    }
    else {
      this.patientProfileService.createOrUpdateCardInfo(this.model).subscribe(r => {
        if (r) {
          this.dialog.showToastrSuccess("Save Credit Card", MessageConstant.REQUEST_SUCCESS_CONST);
          this.closeModal.emit(true);
          this.hide();
        } else {
          this.dialog.showSwalErrorAlert("Error", MessageConstant.FAILURE_REQUEST);
        }
      }, error => {
        this.isError = true;
        this.error = error.error;
      });
    }
  }

  hide() {
    this.form.resetForm();
    this.modal.hide();
  }

  show(patientId = null) {
    this.isError = false;
    this.error = "";
    this.model.PatientID = patientId;
    this.modal.show();
  }
}
