import { BaseCriteria } from './base.criteria';
export class SRFaxNotificationCriteria extends BaseCriteria {
    ID: string;
    CompanyID: string;
    SendFrom: string;
    SendTo: string;
    AppointmentDocumentID: string;
    IsSent: boolean;
    SentDate?: Date;
    LastAttemptErrorMessage: string;
    SRFaxDetailID: string;
    AppointmentID:string;
}