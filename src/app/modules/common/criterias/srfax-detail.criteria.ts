import { BaseCriteria } from './base.criteria';
export class SRFaxDetailCriteria extends BaseCriteria {
    ID: string;
    FileName: string;
    SentStatus: string;
    DateQueued: string;
    DateSent: string;
    EpochTime: string;
    ToFaxNumber: string;
    Pages: number;
    Duration: number;
    RemoteID: string;
    ErrorCode: string;
    Size: number;
    AccountCode: string;
}