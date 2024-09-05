import { BaseCriteria } from './base.criteria';

export class PatientStorageCriteria extends BaseCriteria{
    PatientID!: string; 
    CompanyID!: string;
    AppointmentId!: string;
}