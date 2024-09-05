export class MessageChatModel {
    ID: string;
    ParticipantID: string;
    UserID: string;
    RoomID: string;
    Content: string;
    SentDate: Date
    ProfilePicture: string;
    isSending: boolean = false;
    IsFile:boolean;
    MineType:string;
    Path:string;
    IsProvider:boolean;
    Sender:string;
}