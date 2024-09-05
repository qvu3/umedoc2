export class ProviderCountOnDateViewModel {
    DateInfo: Date;
    Total: number;
}

export class ProviderCountOnDateCriteriaModel {
    StartDate: Date;
    EndDate: Date;
    ApptCategoryCode: string;
    State: string;
    Gender: string;
    IsOnDemand: boolean = true;
    Language: string;
    ProviderId:string;
    IsCountSlot : boolean = false;
}