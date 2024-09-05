import { AppointmentSlotDetailModel } from './appointment-slot-detail.model';

export class AppointmentSlotGroupModel{
    Times:number;
    AppointmentDate:Date;
    MorningSlots:Array<AppointmentSlotDetailModel>;
    EveningSlots:Array<AppointmentSlotDetailModel>;
    constructor() {
        this.MorningSlots = new Array<AppointmentSlotDetailModel>();
        this.EveningSlots = new Array<AppointmentSlotDetailModel>();
    }
}