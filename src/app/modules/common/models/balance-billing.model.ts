import { AppointmentModel } from './appointment.model';

export class InsuranceBalanceBillingModel {
    ID: string;
    AppointmentID: string;
    DocumentUrl: string;
    Amount: number;
    IsPaid: boolean;
    PaidDate?: Date;
    PaymentIntentID: string;
    Appointment: AppointmentModel;
}