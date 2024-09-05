import UserModel from '../../../modules/common/models/user.model';
import { TicketMessageModel } from './ticket-message.model';

export class TicketModel {
    ID!: string;
    PatientID!: string;
    Status!: number;
    Priority!: number;
    Type!: string;
    Subject!: string;
    CreatedOn!: Date;
    Patient!: UserModel;
    Message!: string;
    Messages:Array<TicketMessageModel>=[];
    UseChatBot:boolean=false;
}