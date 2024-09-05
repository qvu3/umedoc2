import { GroupApptModel } from "./group-appt.model";
import UserModel from "./user.model";

export class GroupApptDocumentsModel {
    ID!: string;
    GroupApptID!: string;
    GroupAppt!: GroupApptModel;
    FileName!: string;
    Url!: string;
    UploadedBy!: string;
    UploadUser!: UserModel;
}