import { BaseCriteria } from './base.criteria';

export class AppointmentCriteria extends BaseCriteria {
    ID: string;
    PatientID: string;
    ProviderID: string;
    StatusID: string;
    ReasonID: string;
    IsOnDemand?: any = "";
    AppointmentTime: Date;
    Liked: boolean;
    Description: string;
    AppointmentType?: number; // [null: all], [0: requested,insession], [1: completed,cancelled]
    Type: string; //patient, appointment

    AppointmentGroup: string; //"On Demand", "Scheduling", "All"
    PatientName: string;
    Provider: string;
    RequestBefore?: Date;
    RequestAfter?: Date;
}