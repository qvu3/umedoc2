import { PverifyCheckHistoryModel } from "./pverify-check-history.model";
import UserModel from "./user.model";

export class PverifyPatientInsuranceModel {
    ID: string;
    PatientID: string;
    PayerCode: string;
    MemberID: string;
    IsSubscriberPatient: boolean;
    SubscriberFirstName: string;
    SubscriberLastName: string;
    SubscriberDOB: Date | null;
    DependentFirstName: string;
    DependentLastName: string;
    DependentDOB: Date | null;
    CreatedBy: string;
    CreatedOn: Date;
    Status: string;
    DeclineReason: string;
    Patient: UserModel;
    PverifyCheckHistories: PverifyCheckHistoryModel[] = [];
    PayerName: string;
    FinalCopay?: number | null;
    IsChargePatient: boolean;
    Amount: number;
    IsLockPatient: boolean;

    FrontImageUrl: string;
    FrontImageUrlView: string;
    BackImageUrl: string;
    BackImageUrlView: string;
    InsuranceType:string;

    ChargeFullAmount:boolean;
}

