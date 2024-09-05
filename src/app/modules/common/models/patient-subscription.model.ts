import { SubscriptionPlanModel } from "./subscription-plan.model";
import UserModel from "./user.model";

export class PatientSubscriptionModel {
    Id: string;
    PatientID: string;
    PatientUser: UserModel;
    StripeSubscriptionID: string; 
    SubscriptionPlan: SubscriptionPlanModel;
    Status:string;
    IsActive: boolean = false;

    constructor(){
        this.SubscriptionPlan = new SubscriptionPlanModel();
    }
}