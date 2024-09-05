import { BaseCriteria } from "./base.criteria";
export default class UserCriteria extends BaseCriteria {
    CompanyID: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    CellPhoneNumber: string;
    Role: string;
    IsStaff: boolean = false;
    Name:string;
    DOB?:any;
    Email:string;
    Inactive?:boolean;
    RefID?:number;
    IsSubscription?:boolean;
}