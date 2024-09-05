import { PatientMedicalConditionAssignmentModel, PatientMedicationAssignmentModel, PatientAllergyAssigmentModel } from "./patient-allergy.model";
import UserModel from './user.model';
import { CardInfoModel } from './stripe-info.model';
import { AllergyAssignmentModel } from './allergy-info.model';
import { PatientInsuranceModel } from './patient-insurance.model';
import { DeletePatientInsuranceModel } from "./delete-patient-insurance.model";

export class PatientProfileModel {
    ID!: string;
    PatientID!: string;
    EmergencyContactName!: string;
    EmergencyContactPhoneNumber!: string;
    PrimaryCare!: string;
    AllergyOthers!: string;
    MedicalConditionsOthers!: string;
    MedicationOthers!: string;
    PreferredPharmacy!: string;
    PreferredPharmacyPhoneNumber!: string;
    PreferredPharmacyAddress!: string;
    PreferredPharmacyAddress2!: string;
    PreferredPharmacyState!: string;
    PreferredPharmacyCity!: string;
    PreferredPharmacyZipCode!: string;
    PreferredPharmacyLat!: number;
    PreferredPharmacyLng!: number;

    InsuranceName!: string;
    BeneficiaryNumber!: string;
    InsuranceGroupNumber!: string;
    InsurancePhoneNumber!: string;
    InsuranceAddress!: string;
    CustomerID!: string;
    CardID!: string;
    IsUpdateProfile: boolean = false;

    PatientUser: UserModel;
    PatientMedicalConditionAssignments: Array<PatientMedicalConditionAssignmentModel>;
    PatientMedicationAssignments: Array<PatientMedicationAssignmentModel>;
    PatientAllergyAssignments: Array<PatientAllergyAssigmentModel>;
    CardInfo!: CardInfoModel;
    Allergies: Array<AllergyAssignmentModel>;
    PharmacyId!: number;
    DS_PatientID!: number;
    PatientInsurances: Array<PatientInsuranceModel>;
    DeletedPatientInsurances: Array<DeletePatientInsuranceModel>;
    IsRestricted!: boolean;
    FromMobileApp!: boolean;
    DiscoverFrom!: string;
    OtherDiscoverFrom!: string;
    BlockedType!: string;
    MatchedPatient!: string;
    constructor() {
        this.PatientUser = new UserModel();
        this.Allergies = new Array<AllergyAssignmentModel>();
        this.PatientAllergyAssignments = new Array<PatientAllergyAssigmentModel>();
        this.PatientMedicalConditionAssignments = new Array<PatientMedicalConditionAssignmentModel>();
        this.PatientMedicationAssignments = new Array<PatientMedicationAssignmentModel>();
        this.PatientInsurances = new Array<PatientInsuranceModel>();
        this.DeletedPatientInsurances = new Array<DeletePatientInsuranceModel>();
    }
}