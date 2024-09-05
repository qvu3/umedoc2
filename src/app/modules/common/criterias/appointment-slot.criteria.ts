import { BaseCriteria } from './base.criteria';
export class AppointmentSlotCriteria extends BaseCriteria {
    ID!: string;
    AppointmentID!: string;
    ProviderID!: string;
    StartTime!: Date;
    EndTime!: Date;
    AppointmentSlotStatus!: string;
    ProviderIds:string[] =[];
}