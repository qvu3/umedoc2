import { Injectable, EventEmitter } from '@angular/core';
import Global from '../../../Global';
import UserModel from '../models/user.model';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';
import { VaccineApptModel } from '../models/vaccin-appt.model';
import { GroupApptModel } from '../models/group-appt.model';
import { GroupApptPatientModel } from '../models/group-appt-patient.model';

@Injectable()
export class AuthenticationService {
    urlLogin: string = Global.apiUrl + '/token';
    onChangePassword: EventEmitter<boolean> = new EventEmitter();
    isIdle: boolean = false;
    browserRefresh: boolean = false;
    onReloadTaskList: EventEmitter<boolean> = new EventEmitter();
    onReloadListPaymentHistory: EventEmitter<boolean> = new EventEmitter();
    onLoadCategoryIDEvent: EventEmitter<string> = new EventEmitter();
    totalMessageUnread: number = 0;
    currentRoomId: string | undefined;
    onReloadGetRoomsChat: EventEmitter<boolean> = new EventEmitter();
    onReloadWriteDocumentReferral: EventEmitter<boolean> = new EventEmitter();
    onReloadGroupAppt: EventEmitter<boolean> = new EventEmitter();
    onReloadTicketTable :EventEmitter<boolean> = new EventEmitter();
    onReloadPatientRequestTable :EventEmitter<boolean> = new EventEmitter();
    constructor(private http: HttpClient) {

    }

    get AppointmentPatientID() {
        var strAppt = sessionStorage.getItem('appointment-patient-id');
        return strAppt;
    }

    set AppointmentPatientID(id) {
        sessionStorage.setItem('appointment-patient-id', id ?? '');
    }

    get vaccineAppointment() {
        var strAppt = sessionStorage.getItem('vaccine-appt');
        if (strAppt) {
            return JSON.parse(strAppt) as VaccineApptModel;
        }
        return null;
    }

    set vaccineAppointment(value) {
        sessionStorage.setItem('vaccine-appt', value ? JSON.stringify(value) : '');
    }

    get requestAppointment() {
        var strAppt = sessionStorage.getItem('request-appt');
        if (strAppt) {
            return JSON.parse(strAppt) as AppointmentModel;
        }
        return null;
    }

    set requestAppointment(value) {
        sessionStorage.setItem('request-appt', value ? JSON.stringify(value) : '');
    }

    get IsOnDemandAppointment() {
        return sessionStorage.getItem('is-ondemand-appointment');
    }

    set IsOnDemandAppointment(value) {
        sessionStorage.setItem('is-ondemand-appointment', value ?? '');
    }


    get groupApptPatient() {
        var strAppt = sessionStorage.getItem('group-appt-patient');
        if (strAppt) {
            return JSON.parse(strAppt) as GroupApptPatientModel;
        }
        return null;
    }

    set groupApptPatient(value) {
        sessionStorage.setItem('group-appt-patient', value ? JSON.stringify(value) : '');
    }

    removeRequestAppointment() {
        sessionStorage.removeItem('request-appt');
    }

    Login(email: string, password: string) {
        sessionStorage.removeItem(Global.currentUser);
        let urlData = `username=${email}&password=${password}&companyId=${Global.CompnayID}`;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });


        return this.http.post(this.urlLogin, urlData, { headers: headers }) as Observable<UserModel>;
    }

    Register(entity: any) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        var url = `${Global.apiUrl}/api/User/Register`;
        return this.http.post(url, entity, { headers: headers }) as Observable<UserModel>;
    }

    RegisterProvider(entity: any) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        var url = `${Global.apiUrl}/api/User/RegisterProvider`;
        return this.http.post(url, entity, { headers: headers }) as Observable<UserModel>;
    }

    UpdatePatientSignUp(entity: any) {
        var url = `${Global.apiUrl}/api/User/UpdateSignUpInfo`;
        return this.http.post(url, entity) as Observable<UserModel>;
    }

    SetDefaultDate(date: any) {
        var obj = this.GetDefaultDate();
        if (!obj) {
            obj = { date: date };
        }
        else {
            obj.date = date;
        }
        sessionStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    }

    SetReceivedDate(date: any) {
        var obj = this.GetDefaultDate();
        if (!obj) {
            obj = { receivedDate: date };
        }
        else {
            obj.receivedDate = date;
        }
        sessionStorage.setItem(Global.defaultDateKey, JSON.stringify(obj));
    }

    GetDefaultDate() {
        var strValue = sessionStorage.getItem(Global.defaultDateKey);
        if (strValue) {
            return JSON.parse(strValue);
        }
        return null;
    }

    SetCurrentUser(userInfo: any) {
        sessionStorage.setItem(Global.currentUser, userInfo);
    }

    GetCurrentUser(): UserModel | null {
        var strValue = sessionStorage.getItem(Global.currentUser);
        if (strValue) {
            return JSON.parse(strValue) as UserModel;
        }
        return null;
    }

    SignOut() {
        sessionStorage.clear();
    }

    UpdateCurrentInfo(user: { FirstName: string; LastName: string; Email: string; ProfilePicture: string; State: string; }) {
        var cUser = this.GetCurrentUser();
        if (cUser && user) {
            cUser.FirstName = user.FirstName;
            cUser.LastName = user.LastName;
            cUser.Email = user.Email;
            cUser.ProfilePicture = user.ProfilePicture;
            cUser.State = user.State;
            this.SetCurrentUser(JSON.stringify(cUser));
        }
    }

    setIsIdle(isIdle: boolean) {
        this.isIdle = isIdle;
    }

}
