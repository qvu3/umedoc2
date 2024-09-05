import UserModel from './user.model';

export class PatientStorage {
    ID!: string;
    PatientID!: string;
    CompanyID!: string;
    FileName!: string;
    FireUrl!: string;
    UploadedOn!: Date;
    UploadedBy!: string;
    Uploader!: UserModel;
    IsLink!: boolean;
}
