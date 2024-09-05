export class PatientAllergyModel {
    ID: string;
    AllergyName: string;
    Description: string;
    SortOrder: number;
    IsChecked: boolean;
    IsOther: boolean;
    IsInactived: boolean = false;
}

export class PatientAllergyAssigmentModel {
    ID: string;
    PatientProfileID: string;
    PatientAllergyID: string;

    PatientAllergy: PatientAllergyModel;
    constructor() {
        this.PatientAllergy = new PatientAllergyModel();
    }
}

export class PatientMedicalConditionModel {
    ID: string;
    Name: string;
    MedicalConditionName: string;
    SortOrder: number;
    IsChecked: boolean;
    IsOther: boolean;
    IsInactived: boolean = false;
}

export class PatientMedicalConditionAssignmentModel {
    ID: string;
    PatientProfileID: string;
    PatientMedicalConditionID: string;

    PatientMedicalCondition: PatientMedicalConditionModel;
    constructor() {
        this.PatientMedicalCondition = new PatientMedicalConditionModel();
    }
}

export class PatientMedicationModel {
    ID: string;
    MedicationName: string;
    SortOrder: number;
    IsChecked: boolean;
    IsOther: boolean;
    IsInactived: boolean = false;
}

export class PatientMedicationAssignmentModel {
    ID: string;
    PatientProfileID: string;
    PatientMedicationID: string;
    PatientMedication: PatientMedicationModel;
    constructor() {
        this.PatientMedication = new PatientMedicationModel();
    }
}