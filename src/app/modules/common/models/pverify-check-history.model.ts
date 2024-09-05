import { PverifyPatientInsuranceModel } from "./pverify-patient-insurance.model";

export class PverifyCheckHistoryModel {
    ID: string;
    RequestID: number;
    PverifyPatientInsuranceID: string;
    APIResponseMessage: string;
    IsHMOPlan: boolean;
    PlanCoverageStatus: string;
    IndividualDeductibleRemainingInNet_1: number | null;
    IndividualDeductibleRemainingInNet_2: number | null;
    IndividualDeductibleRemainingOutNet_1: number | null;
    IndividualDeductibleRemainingOutNet_2: number | null;
    CoPayInNet: number | null;
    CoPayOutNet: number | null;
    CoInsInNet: number | null;
    CoInsOutNet: number | null;
    DateOfService: Date;
    PverifyPatientInsurance: PverifyPatientInsuranceModel;
    ReportUrl: string;
    ReportUrlViewer: string;
    ContractedServiceProvider:string;
}