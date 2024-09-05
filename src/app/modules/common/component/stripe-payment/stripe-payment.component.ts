import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  Input
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { AppointmentModel } from '../../models/appointment.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AppointmentService } from '../../services/appointment.service';
import { CommonDialogService } from '../../services/dialog.service';
import { StripeInfoModel } from '../../models/stripe-info.model';
import { Router } from '@angular/router';
import { PatientProfileService } from '../../services/patient-profile.service';
import { PatientProfileModel } from '../../models/patient-profile.model';
import Global from 'src/app/Global';

declare var Stripe: any;
declare var $: any;

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  @Input() model: AppointmentModel;
  @Input() IsChangeCardInfo: boolean;
  @Input() IsCardError: boolean;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  clientSecret: any;
  customerID: string;
  stripe: any;
  patientProfile: PatientProfileModel = new PatientProfileModel();
  constructor(
    private authenticate: AuthenticationService,
    private router: Router,
    private appointmentService: AppointmentService,
    private dialog: CommonDialogService,
    private patientProfileService: PatientProfileService,
    private cd: ChangeDetectorRef) {
    super(authenticate);
    this.stripe = Stripe(Global.stripePublicKey);
  }

  ngAfterViewInit() {
    var elements = this.stripe.elements();
    const style = {
      base: {
        lineHeight: '44px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: 'red'
        }
      }
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }


  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    if ($('div#card-errors') && $('div#card-errors').length > 0) {
      this.dialog.showSwalErrorAlert("Error", this.error);
      return;
    }

    // Case save and charge Immediately
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      this.dialog.showSwalErrorAlert("Error", error.message)
    } else {

     this.patientProfileService.GetPatientProfileInfo(this.currentUser.Id).subscribe(c => {
        if (c) {
          this.patientProfile = c;
          this.model.IsCharge = true;
          var stripeInfo = new StripeInfoModel();
          stripeInfo.IsChargImmediately = true;
          stripeInfo.Token = token.id;
          stripeInfo.IsChangeCardInfo = this.IsChangeCardInfo;
          if (this.patientProfile.InsuranceName) {
            stripeInfo.IsChargImmediately = false;
          }
          stripeInfo.CustomerID = this.patientProfile.CustomerID;
          stripeInfo.CardID = this.patientProfile.CardID;
          stripeInfo.Appointment = this.model;
          this.appointmentService.CreatePaymentMethod(stripeInfo).subscribe(k => {
            if (k) {
              if (k && k.ID) {
                this.router.navigate([`/appointment-room`, k.ID]);
              }
            } else {
              this.dialog.showSwalErrorAlert("Error", "Request Appointment Occurring error, please try again.");
            }
          });
        } else {
          this.dialog.showSwalErrorAlert("Error", "Request Appointment Occurring error, please try again.");
        }
      });
    }
  }
}
