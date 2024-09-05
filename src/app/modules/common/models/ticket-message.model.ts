import UserModel from 'src/app/modules/common/models/user.model';
import { TicketModel } from './ticket.model';
export class TicketMessageModel {
    ID: string;
    TicketID: string;
    UserID: string;
    Message: string;
    IsPrivate: boolean;
    CreatedOn: Date;
    Ticket: TicketModel;
    User: UserModel;
    IsBot:boolean;
    CanDelete:boolean;
    FileUrl:string;
}