export class PayerModel {
    ID!: string;
    PayerCode!: string;
    PayerName!: string;
    Type!: string;
    Eligibility!: boolean;
    ClaimStatus?: boolean;
    ChargeFullAmount!: boolean;
}