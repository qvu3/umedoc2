export class PatientInsuranceModel {
    ID!: string;
    PatientID!: string;
    InsuranceName!: string;
    IsNotOnTheList!: boolean;
    BeneficiaryNumber!: string;
    GroupNumber!: string;
    FrontImageUrl!: string;
    FrontImageUrlView!: string;
    BackImageUrl!: string;
    BackImageUrlView!: string;
    PatientCopay?: number;
    DontKnowCopay?: boolean;
    IsHMOPlan!: boolean;
    IsDependent!: boolean;
    Relationship!: string;
    SubscriberName!: string;
    SubscriberDOB?: Date;

    SubscriberDescription!: string;
}

export class S3Model {
    Key!: string;
}