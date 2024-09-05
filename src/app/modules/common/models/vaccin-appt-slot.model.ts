import { VaccineApptModel } from "./vaccin-appt.model";

export class VaccineApptSlotModel {
    ID!: string;
    StartTime!: Date;
    EndTime!: Date;
    VaccineApptID!: string;
    VaccineAppt!: VaccineApptModel;
}