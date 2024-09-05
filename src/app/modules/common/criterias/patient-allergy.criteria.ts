import { BaseCriteria } from './base.criteria';
export class PatientAllergyCriteria extends BaseCriteria {
    ID!: string;
    AllergyName!: string;
    SortOrder!: number;
    IsInactived: boolean = false;
}