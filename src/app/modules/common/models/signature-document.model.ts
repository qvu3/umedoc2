export default class SignatureDocumentModel {
    PatientID: string;
    CompanyID: string;
    Content: string;
    SignatureContent: string;
}

export class InviteGuestToVideoModel {
    AppointmentID: string;
    Email: string;
    CellPhone: string;
}

export class WriteLabOrderModel {
    AppointmentID: string;
    CompanyID: string;
    Content: string;
    LabOrder: string;
    ICDCodes: string;
    OrderDate?: Date;
    SignatureContent: string;
    LabOrderView: string;
    IsWriteLabOrder: boolean;
}