export class ProviderLicenseModel {
    ID!: string;
    ProviderProfileID!: string;
    LicenseState!: string;
    TakeInsurance!: boolean;
    EffectiveDate?: Date;
    ExpirationDate?: Date;
    LicenseNumber!: string;
    LicenseImageUrl!: string;
    LicenseImageUrlView!: string;
    TakeMedicare!: boolean;
    TakeMedicaid!: boolean;

    DEANumber!: string;
    DEAExpirationDate?: Date;
    MalpracticeRenewalDate?: Date;
    ProviderID!: string;
}