import { BaseCriteria } from './base.criteria';
export class PatientProfileCriteria extends BaseCriteria {
    ID: string;
    PatientID: string;
    EmergencyContactName: string;
    EmergencyContactPhoneNumber: string;
    PrimaryCare: string;
    AllergyOthers: string;
    MedicalConditionsOthers: string;
    MedicationOthers: string;
    PreferredPharmacy: string;
    PreferredPharmacyPhoneNumber: string;
    PreferredPharmacyAddress: string;
    PreferredPharmacyLat: number;
    PreferredPharmacyLng: number;
}