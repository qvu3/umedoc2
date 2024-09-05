import { BaseCriteria } from './base.criteria';
export class PatientMedicationCriteria extends BaseCriteria {
    ID!: string;
    MedicationName!: string;
    SortOrder!: number;
    IsInactived: boolean = false;
}