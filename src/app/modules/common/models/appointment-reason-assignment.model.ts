import { AppointmentReasonModel } from './appointment-reason.model';

export class AppointmentReasonAssignmentModel {
    ID!: string;
    AppointmentReasonID!: string;
    AppointmentID!: string;
    IsChecked!: boolean;
    AppointmentReason: AppointmentReasonModel;
    constructor() {
        this.AppointmentReason = new AppointmentReasonModel();
    }
}