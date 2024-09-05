import { BaseCriteria } from './base.criteria';
export class PatientAllergyAssignmentCriteria extends BaseCriteria {
    ID!: string;
    PatientID!: string;
    PatientAllergyID!: string;
}