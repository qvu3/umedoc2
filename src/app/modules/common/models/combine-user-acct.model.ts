import UserModel from 'src/app/modules/common/models/user.model';
export interface CombineUserAcctModel {
    ID: string;
    NewUserID: string;
    OldUserID: string;
    NewUser: UserModel;
    OldUser: UserModel;
}