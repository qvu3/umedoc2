import { BaseCriteria } from "../criterias/base.criteria";

export class PatientPaymentHistoryCriteria extends BaseCriteria {
    PatientName: string;
    DOB?: any;
    Email: string;
    CellPhone: string;
    FromDate: Date;
    ToDate: Date;
    UserID: string;
    CustomerID: string;
}