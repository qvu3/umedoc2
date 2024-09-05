import UserModel from './user.model';

export class ProviderStorage {
    ID: string;
    ProviderID: string;
    CompanyID: string;
    FileName: string;
    FireUrl: string;
    UploadedOn: Date;
    UploadedBy: string;
    Uploader: UserModel;
    IsLink: boolean;
}
