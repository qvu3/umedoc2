import { BaseCriteria } from './base.criteria';
export class PatientMedicationAssignmentCriteria extends BaseCriteria {
    ID!: string;
    PatientID!: string;
    PatientMedicationID!: string;
}