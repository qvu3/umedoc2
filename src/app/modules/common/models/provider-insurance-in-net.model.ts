import UserModel from "./user.model";

export class ProviderInsuranceInNetModel{
    ID!: string;
    ProviderID!: string;
    State!: string;
    PverifyPayerCode!: string;

    Provider!: UserModel;
}