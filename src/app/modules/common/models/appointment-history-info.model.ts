export class AppointmentHistoryInfoModel {
    ID!: string;
    ProfilePicture!: string;
    ProviderUserName!: string;
    AppointmentTimeSort!: string;
    AppointmentTime?: Date;
    StatusName!: string;
    TextReasons!: string;
    CancelReason!: string;
    Notes: Array<AppointmentHistoryNoteModel>;

    constructor() {
        this.Notes = new Array<AppointmentHistoryNoteModel>();
    }
}

export class AppointmentHistoryNoteModel {
    ID!: string;
    ProfilePicture!: string;
    ProviderUserName!: string;
    CreatedOn!: Date;
    Subjective!: string;
    Plan!: string;
    FollowUp!: string;
}
