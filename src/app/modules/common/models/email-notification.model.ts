
export class EmailNotificationModel {
    ID: string;
    CompanyID: string;
    DisplayFrom: string;
    AddressFrom: string;
    SendTo: string;
    Subject: string;
    Body: string;
    IsHTML: boolean = false;
    NumOfAttempts: number;
    CreatedOn: Date;
    SendAfter: Date;
    IsSent: boolean = false;
    SentDate?: Date;
    LastAttemptErrorMessage: string;
}