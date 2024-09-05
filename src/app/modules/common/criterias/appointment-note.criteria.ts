import { BaseCriteria } from './base.criteria';
export class AppointmentNoteCriteria extends BaseCriteria {
    ID!: string;
    AppointmentID!: string;
    NoteContent!: string;
    IsReleased!: boolean;
    IsFollowUp!: boolean;
    IsClinicalNote!: boolean;
    ProviderID!: string;
    CreatedOn!: Date;
}