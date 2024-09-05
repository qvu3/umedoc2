export class VideoCallHistoryModel {
    ID: string;
    ApptID: string;
    UserID: string;
    IsLeft: boolean;
    JoinedDate?: Date;
    LeftDate?: Date;
}