import UserModel from 'src/app/modules/common/models/user.model';
export class PatientRequestModel {
    ID: string;
    PatientID: string;
    RequestCategory: string;
    Description: string;
    Status: string;
    CreatedDate: Date;
    CreatedBy: string;
    User: UserModel;
    CreatedByUser: UserModel;
}