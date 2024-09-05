import { BaseCriteria } from './base.criteria';
export class EmailNotificationCriteria extends BaseCriteria {
    ID!: string;
    CompanyID!: string;
    DisplayFrom!: string;
    AddressFrom!: string;
    SendTo!: string;
    Subject!: string;
    Body!: string;
    IsHTML: boolean = false;
    NumOfAttempts!: number;
    CreatedOn!: Date;
    SendAfter!: Date;
    IsSent: boolean = false;
    SentDate?: Date;
    LastAttemptErrorMessage!: string;
}