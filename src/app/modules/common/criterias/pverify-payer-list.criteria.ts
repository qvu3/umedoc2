import { BaseCriteria } from './base.criteria';
export class PverifyPayerListCriteria extends BaseCriteria {
    PayerCode: string;
    PayerName: string;
    Type: string; 
    ChargeFullAmount: boolean;
}