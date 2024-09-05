import { BaseCriteria } from './base.criteria';
export class PatientMedicalConditionCriteria extends BaseCriteria {
    ID!: string;
    MedicalConditionName!: string;
    SortOrder!: number;
    IsInactived: boolean = false;
}