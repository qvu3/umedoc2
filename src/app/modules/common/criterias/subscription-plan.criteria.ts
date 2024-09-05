import { BaseCriteria } from "./base.criteria";

export class SubscriptionPlanCriteria extends BaseCriteria {
    Id: string;
    StripeProductID: string;
    StripePriceID: string;
    ProductName: string;
    PriceDetail: string;
}