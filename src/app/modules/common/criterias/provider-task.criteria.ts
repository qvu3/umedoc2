import { BaseCriteria } from './base.criteria';
export class ProviderTaskCriteria extends BaseCriteria {
    ID!: string;
    CreatedBy!: string;
    CreatedOn!: Date;
    Status!: string;
    Description!: string;
    PatientID!: string;
}