import { Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import Global from '../../../Global';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AppointmentModel } from '../models/appointment.model';

declare var paypal: any;
declare var $: any;
@Directive({
    selector: '[appPaypalPayment]'
})
export class PaypalPaymentDirective implements AfterViewInit, OnChanges {
    @Input() idButton: string;
    @Input() model: AppointmentModel;
    @Input() routerName: string;
    constructor(private ele: ElementRef,
        private router: Router,
        private authenService: AuthenticationService,
        private service: AppointmentService) {

    }
    ngOnChanges(params: SimpleChanges) {
       // console.log(params);
        if (params && params.idButton && params.idButton.currentValue
            && params.idButton.currentValue != params.idButton.previousValue
            && params.model && params.model.currentValue
            && params.model.currentValue != params.model.previousValue) {
            this.renderPaypalButton();
        }
    }

    ngAfterViewInit() {

    }

    renderPaypalButton() {
        paypal.Button.render({
            // Configure environment
            env: Global.mode,
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'gold',
                shape: 'pill',
            },

            // Set up a payment
            payment: function (data, actions) {
                return this.service.CreatePayment(this.model).then(r => {
                    return r.id;
                });
            }.bind(this),
            // Execute the payment
            onAuthorize: function (data, actions) {
                var req = {
                    paymentID: data.paymentID,
                    payerID: data.payerID,
                    appointment: Object.assign({}, this.model)
                }
                return this.service.ExecutePayment(req).then(r => {
                    if (r && r.ID) {
                        this.router.navigate([`/appointment-room`, r.ID]);
                    }
                });
            }.bind(this)
        }, '#' + this.idButton);
    }
}
