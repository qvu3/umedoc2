import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr"; 
import Global from "../../../Global";
import { AppointmentModel } from '../models/appointment.model';
import { GroupApptModel } from "../models/group-appt.model";
import { TicketMessageModel } from "../models/ticket-message.model";

@Injectable()
export class PrmcHub {
    private hubConnection: HubConnection;
    public onChangeStatusAppointmentNotify: EventEmitter<AppointmentModel> = new EventEmitter();
    public onChangeStatusDoctor:EventEmitter<any> = new EventEmitter();
    public onChangeBackupStatusDoctor:EventEmitter<any> = new EventEmitter();
    public onChangeStatusGroupApptNotify: EventEmitter<GroupApptModel> = new EventEmitter();

    public onNewMessageTicketNotify :EventEmitter<TicketMessageModel> = new EventEmitter();
    public onDeleteMessageTicketNotify :EventEmitter<TicketMessageModel> = new EventEmitter();
    constructor() {
       
    }

    init() { 
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(Global.apiHub)
            .configureLogging(LogLevel.Information)
            .build();
        Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
        this.hubConnection.start().then(r => {
            this.registerReceiveNotify();
        });

        this.hubConnection.onclose(()=>{
           // console.log('Prmc Hub close');
            this.hubConnection.start();
        });
    }

    registerReceiveNotify() {
        this.hubConnection.on('deleteMessageTicketNotify', (params)=>{
            this.onDeleteMessageTicketNotify.emit(params);
        });
        this.hubConnection.on('messageTicketNotify', (params)=>{
            this.onNewMessageTicketNotify.emit(params);
        });

        this.hubConnection.on('updateStatusAppointmentNotify', (params) => {
            if (this.onChangeStatusAppointmentNotify) {
                this.onChangeStatusAppointmentNotify.emit(params);
            }
        });

        this.hubConnection.on('updateStatusDoctor', (params) => {
            if (this.onChangeStatusDoctor) {
                this.onChangeStatusDoctor.emit(params);
            }
        });

        this.hubConnection.on('updateBackupStatusDoctor', (params) => {
            if (this.onChangeBackupStatusDoctor) {
                this.onChangeBackupStatusDoctor.emit(params);
            }
        });


        this.hubConnection.on('updateStatusGroupApptNotify', (params) => {
            if (this.onChangeStatusGroupApptNotify) {
                this.onChangeStatusGroupApptNotify.emit(params);
            }
        });
    }
}