import { BaseCriteria } from './base.criteria';

export class PatientRequestCriteria extends BaseCriteria{
    PatientName:string;
    Status: string;
    RequestCategory:string;
}