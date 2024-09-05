export class DeletePatientInsuranceModel {
    ID: string;
    PatientInsuranceID: string;
    DeletedDate: Date;
    PatientID: string;
    InsuranceName: string;
    IsNotOnTheList: boolean;
    BeneficiaryNumber: string;
    GroupNumber: string;
    FrontImageUrl: string;
    FrontImageUrlView: string;
    BackImageUrl: string;
    BackImageUrlView: string;
    PatientCopay?: number;
    DontKnowCopay?: boolean;
    IsHMOPlan: boolean;
    IsDependent: boolean;
    Relationship: string;
    SubscriberName: string;
    SubscriberDOB?: Date;

    SubscriberDescription: string;
}