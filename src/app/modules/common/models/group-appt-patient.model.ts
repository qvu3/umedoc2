import { GroupApptDocumentsModel } from "./group-appt-documents.model";
import { GroupApptModel } from "./group-appt.model";
import UserModel from "./user.model";

export class GroupApptPatientModel {
    ID: string;
    GroupApptID: string;
    GroupAppt: GroupApptModel;
    PatientID: string;
    PatientUser: UserModel;

    ProviderID: string;
    StripeChargeID: string;
    IsCancelled: boolean;

    TotalPrice: number;
    IsBooked: boolean;
    GroupApptDocuments: GroupApptDocumentsModel[];
    constructor() {
        this.GroupAppt = new GroupApptModel();
        this.IsCancelled = false;
        this.isAddInsurance = null;
    }

    isAddInsurance: boolean = null;
    PaidByInsurance:boolean = null;

}