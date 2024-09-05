import { AppointmentModel } from './appointment.model';

export class StripeInfoModel {
    Token: string = '';
    CustomerID: string = '';
    CardID: string = "";
    PaymentMethod: string = '';
    Appointment: AppointmentModel = new AppointmentModel();
    IsChargImmediately: boolean = false;
    IsChangeCardInfo: boolean = false;
}


export class SetupIntentResponseModel {
    ClientSecret!: string;
    CustomerID!: string;
}

export class CardInfoModel {
    IsShowStripePayment: boolean = true;
    State!: string;
    CVV!: string;
    CardNumber!: string;
    ExpiredMonth!: string;
    ExpiredYear!: string;
    PatientID!: string;
}

export class ChargeInfoModel {
    Amount!: number;
    Total!: number;
    AppointmentID!: string;
}

export class CaptureFundInfoModel {
    Amount!: number;
    Total!: number;
    AppointmentID!: string;
    IsPartial!: boolean;
}