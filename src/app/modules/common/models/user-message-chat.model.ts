export class UserMessageChatModel {
    ID:string;
    UserId: string;
    Message: string;
    RoomID: string | null;
    IsFile:boolean;
    MineType:string;
    Path:string;
}