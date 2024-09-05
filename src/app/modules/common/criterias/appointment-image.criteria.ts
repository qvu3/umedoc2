import { BaseCriteria } from './base.criteria'; 
export class AppointmentImageCriteria extends BaseCriteria{
    ID!: string;
    AppointmentID!: string;
    PatientID!: string;
    ImageName!: string;
    ImagePath!: string;
}