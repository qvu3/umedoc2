import { BaseCriteria } from "./base.criteria";

export class PatientSubscriptionCriteria extends BaseCriteria {
    Id: string;
    PatientID: string; 
    StripeSubscriptionID: string;
}