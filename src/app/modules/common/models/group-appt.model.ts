import { GroupApptCategoryModel } from "./group-appt-category.model";
import { GroupApptPatientModel } from "./group-appt-patient.model";
import UserModel from "./user.model";

export class GroupApptModel {
    ID: string;
    Status: string;
    GroupApptCategoryID: string;
    GroupApptCategory: GroupApptCategoryModel;
    ProviderID: string;
    Provider: UserModel;
    StartTime: string;
    Duration: number;
    GroupApptPatients: GroupApptPatientModel[];
    Price: number;
    DailyRoomID:string;
    constructor() {
        this.GroupApptCategory = new GroupApptCategoryModel();
        this.Provider = new UserModel();
        this.GroupApptPatients = new Array<GroupApptPatientModel>();
    }

    CategoryName:string;
    ProviderName:string;
    IsBooked:boolean;
}