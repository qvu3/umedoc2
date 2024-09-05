import { BaseCriteria } from './base.criteria';
export class AppointmentStatusCriteria extends BaseCriteria {
    ID!: string;
    StatusName!: string;
    SortOrder!: number;
    IsInactived!: boolean;
}