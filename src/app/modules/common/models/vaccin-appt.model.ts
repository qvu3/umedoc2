import { AppointmentStatusModel } from "./appointment-status.model";
import UserModel from "./user.model";
import { VaccineScreeningAnswerModel } from "./vaccine-screening-anwser.model";

export class VaccineApptModel {
    ID!: string;
    PatientID!: string;
    StatusID!: string;
    ApptTime!: Date;
    CreatedOn!: Date;
    Patient!: UserModel;
    ApptStatus!: AppointmentStatusModel; 
    SlotID!: string;

    VaccineScreeningAnswers:Array<VaccineScreeningAnswerModel> = new Array<VaccineScreeningAnswerModel>();
}