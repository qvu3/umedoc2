export class ProviderProfileViewModel {
    ID: string;
    ProviderName: string;
    ProfilePicture: string;
    ProviderRoleName: string;
    Price: number | null;
    ProviderID: string;
    ProviderDegreeImagePath: string;
    TotalStar: number;
    NumberOfAppointmentLike:number=0;
    TakeInsurance:boolean;
    TakeMedicare:boolean;
    TakeMedicaid:boolean;
    Badges:Array<string> = [];
    ImageBadges:Array<any> = [];
    PayerCodes:Array<string> = [];
}