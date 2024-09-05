import { BaseCriteria } from './base.criteria';
export class StripePaymentHistoryCriteria extends BaseCriteria {
    PatientID!: string;
    AppointmentID!: string;
}