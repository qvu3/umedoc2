import UserModel from './user.model';

export default class RestrictedPatientLogModel {
    ID!: string;
    PatientID!: string;
    ProviderID!: string;
    CreatedOn!: Date;
    PatientUser!: UserModel;
    ProviderUser!: UserModel;
}
