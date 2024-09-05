export class SRFaxNotificationModel {
    ID!: string;
    CompanyID!: string;
    SendFrom!: string;
    SendTo!: string;
    AppointmentDocumentID!: string;
    IsSent!: boolean;
    SentDate?: Date;
    LastAttemptErrorMessage!: string;
    SRFaxDetailID!: string;
}