import UserModel from './user.model';

export default class ProviderTaskModel {
    ID: string;
    PatientID: string;
    CreatedBy: string;
    CreatedOn: Date;
    Status: string;
    Description: string;
    CreatedUser: UserModel;
    AssignerUserID: string;
    AssignerUser: UserModel;
    AssigneeUserID: string;
    AssigneeUser: UserModel;
}
