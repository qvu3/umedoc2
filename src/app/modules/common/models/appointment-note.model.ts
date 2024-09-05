
export class AppointmentNoteModel {
    ID!: string;
    AppointmentID!: string;
    Subjective!: string;
    Plan!: string;
    FollowUp!: string;
    IsReleased!: boolean;
    IsFollowUp!: boolean;
    IsClinicalNote!: boolean;
    ProviderID!: string;
    CreatedOn!: Date;
    CPTCode!: string;
    ICDCodes:Array<string>;
    PlaceOfService!: string;
    Modifier!: string;
    TimeInMinutes!: number;  
    constructor() {
        this.ICDCodes = new Array<string>();
    }
}