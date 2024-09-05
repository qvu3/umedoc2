export class AuditStackAppointmentModel {
    AppointmentDate!: string;
    TotalCompleted!: number;
    TotalCancelled!: number;
}

export class AuditAppointmentReasonModel {
    ReasonId!: string;
    ReasonName!: string;
    Total!: number;
}

export class DetectAppointmentModel {
    Title!: string;
    Description!: string;
    Total!: number;
}