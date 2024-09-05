import { BaseCriteria } from './base.criteria';
export class AppointmentReasonCriteria extends BaseCriteria{
    ID: string;
    ReasonName: string;
    SortOrder: number;
    CompanyID: string;
    IsInactived: boolean;
}