import { BaseCriteria } from './base.criteria';
export class SMSNotificationCriteria extends BaseCriteria {
    ID!: string;
    CompanyID!: string;
    SendFrom!: string;
    SendTo!: string;
    Body!: string;
    IsSent!: boolean;
    SentDate?: Date;
    NumOfAttempts!: number;
    LastAttemptErrorMessage!: string;
    CreatedOn!: Date;
    SendAfter?: Date;
}