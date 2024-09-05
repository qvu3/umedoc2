import { BaseCriteria } from './base.criteria';
export class TicketCriteria extends BaseCriteria {
    PatientID: string;
    PatientName:string;
    Priority?: number;
    StatusID?: number;
    IsClosed?:boolean;
}