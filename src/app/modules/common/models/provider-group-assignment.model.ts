import { ProviderGroupModel } from './provider-group.model';
import UserModel from './user.model';

export class ProviderGroupAssignmentModel {
    ID!: string;
    ProviderID!: string;
    ProviderGroupID!: string;
    ProviderGroup!: ProviderGroupModel;
    Provider!: UserModel;
}