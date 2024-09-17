import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"; // Updated import
import Global from "../../../Global";
import { AppointmentModel } from '../models/appointment.model';
import { GroupApptModel } from "../models/group-appt.model";
import { TicketMessageModel } from "../models/ticket-message.model";

@Injectable()
export class PrmcHub {
    private hubConnection!: HubConnection;
    public onChangeStatusAppointmentNotify: EventEmitter<AppointmentModel> = new EventEmitter();
    public onChangeStatusDoctor: EventEmitter<any> = new EventEmitter();
    public onChangeBackupStatusDoctor: EventEmitter<any> = new EventEmitter();
    public onChangeStatusGroupApptNotify: EventEmitter<GroupApptModel> = new EventEmitter();
    public onNewMessageTicketNotify: EventEmitter<TicketMessageModel> = new EventEmitter();
    public onDeleteMessageTicketNotify: EventEmitter<TicketMessageModel> = new EventEmitter();

    constructor() {}

    init() { 
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(Global.apiHub) // You may need to add options like authentication tokens here if needed
            .configureLogging(LogLevel.Information)
            .build();

        Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
        this.hubConnection.start().then(() => {
            this.registerReceiveNotify();
        }).catch(err => console.error('Error starting SignalR connection: ', err));

        this.hubConnection.onclose(() => {
            console.log('SignalR Hub closed. Reconnecting...');
            this.hubConnection.start().catch(err => console.error('Error reconnecting: ', err));
        });
    }

    registerReceiveNotify() {
        this.hubConnection.on('deleteMessageTicketNotify', (params) => {
            this.onDeleteMessageTicketNotify.emit(params);
        });

        this.hubConnection.on('messageTicketNotify', (params) => {
            this.onNewMessageTicketNotify.emit(params);
        });

        this.hubConnection.on('updateStatusAppointmentNotify', (params) => {
            this.onChangeStatusAppointmentNotify.emit(params);
        });

        this.hubConnection.on('updateStatusDoctor', (params) => {
            this.onChangeStatusDoctor.emit(params);
        });

        this.hubConnection.on('updateBackupStatusDoctor', (params) => {
            this.onChangeBackupStatusDoctor.emit(params);
        });

        this.hubConnection.on('updateStatusGroupApptNotify', (params) => {
            this.onChangeStatusGroupApptNotify.emit(params);
        });
    }
}
