import { BaseCriteria } from "./base.criteria";

export class GroupApptPatientCriteria extends BaseCriteria {
    GroupApptID!: string | null;
    PatientID!: string;
}