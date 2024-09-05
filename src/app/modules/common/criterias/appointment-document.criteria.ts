import { BaseCriteria } from './base.criteria';

export class AppointmentDocumentCriteria extends BaseCriteria {
    ID: string;
    AppointmentID: string;
    PatientID: string;
    FileName: string;
    FilePath: string;
}