export default class UserModel {
    Id!: string;
    access_token!: string;
    expires_in!: string;

    FirstName!: string;
    LastName!: string;
    Prefix: string = "";
    MiddleName!: string;
    Suffix: string = "";
    FullName!: string;
    ProfilePicture: string = "https://umedoc-prod.s3.amazonaws.com/RandomFiles/umedoc-defaultavatar.png";

    Address1!: string;
    Address2!: string;
    City!: string;
    State!: string;
    ZipCode!: string;
    IsInactived!: boolean;
    Email!: string;
    UserName!: string;
    Password: string = "";
    SecondPassword: string = "";
    SecondPassword1: string = "";
    CellPhone!: string;
    Role!: string;
    Gender: string = '';
    DOB?: any;
    CompanyID!: string;
    EmailConfirmed!: boolean;
    Code!: string;
    Degree!: string;
    NumberOfLikes!: number;
    Availability!: boolean;
    IsReadAndAgreed: boolean = false;
    IsReadAndAgreedTreatment: boolean = false;
    SMSVerificationCode: string = "";
    PhoneNumberConfirmed: boolean = false;
    Text!: string;
    IsRestricted!: boolean;
    NPINumber!: string;
    IsVerified!: boolean;
    RefID!: number;
    YourFriendName!: string;
    YourFriendCellPhone!: string;
    ParentUserID!: string;
    Color!: string;
    PartnerCompanyID!: string;
}