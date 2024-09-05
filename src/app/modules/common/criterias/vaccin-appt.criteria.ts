import { BaseCriteria } from "./base.criteria";

export class VaccineApptCriteria extends BaseCriteria {
    PatientName!: string;
    ApptTime!: Date | null;
}