import { DosePatientPrescription } from 'src/app/modules/common/models/allergy-info.model';
export class PrizmNoteSendModel {
    AppointmentID: string;
    PatientID: string;
    AppointmentDocumentID: string;
    Prescriptions: DosePatientPrescription[];
    SendFileOption: string;
}