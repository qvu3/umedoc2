export class AllergyInfoModel {
    Name: string;
    Code: string;
    CodeType: number;
    CxCUI: number;
}

export class AllergyAssignmentModel {
    PatientId: number;
    PatientAllergyId: number;
    Name: string;
    Code: string;
    CodeType: number;
    Reaction: string;
    ReactionType: number;
    StatusType: number;
    OnsetDate: Date;
}

export class PharmacyModel {
    PharmacyId: number;
    StoreName: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    ZipCode: string;
    PrimaryPhone: string;
    Latitude: number;
    Longitude: number;
}

export class DoseTokenInfoModel {
    ClinicId: string;
    UserId: string;
    ClinicEncrypted: string;
    UserEncrypted: string;
}

export class DoseDispenseUnitType {
    StandardDispenseUnitTypeID: number;
    Name: string;
    Abbreviation: string;
    Singular: string;
    Plural: string;
    SingularOrPlural: string;
    PotencyUnitCode: string;
    IsActive: boolean;
}

export class DosePatientPrescription {
    PrescriptionId: number;
    Directions: string;
    Quantity: string;
    DispenseUnitId: number;
    DispenseUnitType: DoseDispenseUnitType;
    PrescriberName: string;
    Refills: string;
    PharmacyId: number;
    Pharmacy: PharmacyModel;
    EffectiveDate: Date;
    PrescriberId: number;
    MedicationStatus: MedicationStatusEnum;
    Status : PrescriptionStatusType;
    DoseForm: string;
    Route: string;
    Strength: string;
    GenericProductName: string;
    checked:boolean;
}

export enum PrescriptionStatusType {
    Entered = 1 ,
    Printed = 2,
    Sending = 3,
    eRxSent = 4,
    FaxSent = 5,
    Error = 6,
    Deleted = 7,
    Requested = 8,
    Edited = 9,
    EpcsError = 10,
    EpcsSigned = 11,
    ReadyToSign = 12,
    PharmacyVerified= 13
}

export enum MedicationStatusEnum {
    Unknown = 0,
    Active = 1,
    Inactive = 2,
    Discontinued = 3,
    Deleted = 4,
    Completed = 5,
    CancelRequested = 6,
    CancelPending = 7,
    Cancelled = 8,
    CancelDenined = 9,
    Changed = 10
}