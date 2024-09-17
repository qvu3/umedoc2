import { PartnerCompanyModel } from './../models/partner-company.model';
import { BaseService } from './base.service';
import UserModel from '../models/user.model';
import Global from '../../../Global';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailConfirmModel } from '../models/email-confirm.model';
import { HealthKitDataGroupModel } from '../models/health-kit-group.model';
import { HealthKitDataModel } from '../models/health-kit-data.model';
import { HealthKitDataLine } from '../models/health-data-search';
import { SMSStatusHistoryModel } from '../models/sms-status-history.model';
import { CombineUserAcctModel } from '../models/combine-user-acct.model';

@Injectable()
export class UserService extends BaseService<UserModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = Global.apiUrl + '/api/User';
    }

    addCombineUser(newUserId: any , oldUserId: any){
        let url = Global.apiUrl +  `/api/CombineUserAcct/AddCombineUser/${newUserId}/${oldUserId}`;
        return this.httpClient.post(url,null) as Observable<boolean>;
    }

    removeCombineUser(newUserId: any , oldUserId: any){
        let url = Global.apiUrl +  `/api/CombineUserAcct/RemoveCombineUser/${newUserId}/${oldUserId}`;
        return this.httpClient.delete(url) as Observable<boolean>;
    }

    getCombineUserByPatientID(patientId: any){
        let url = Global.apiUrl +  `/api/CombineUserAcct/getByPatientID/${patientId}`;
        return this.httpClient.get(url) as Observable<CombineUserAcctModel[]>;
    }

    addPatientAdmin(entity: UserModel) {
        let url = Global.apiUrl +  `/api/User/AddPatientAdmin`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }


    getPartnerName(){
        let url = Global.apiUrl + `/api/User/getPartnerName`;
        return this.httpClient.get(url) as Observable<string>;
    }

    getPartners(){
        let url = Global.apiUrl + `/api/PatientRequest/GetPartners/`;
        return this.httpClient.get(url) as Observable<PartnerCompanyModel[]>;
    }

    getSMSStatusHistory(sid: any){
        let url = Global.apiUrl + `/api/User/GetSMSStatusHistory/${sid}`;
        return this.httpClient.get(url) as Observable<SMSStatusHistoryModel[]>;
    }


    resendConfirm(id: any) {
        let url = Global.apiUrl + `/api/User/ResendConfirm/${id}`;
        return this.httpClient.get(url) as Observable<boolean>;
    }

    GetCurrent() {
        let url = `${this.resource}/GetCurrent`;
        return this.httpClient.get(url) as Observable<UserModel>;
    }

    GetCurrentInfo() {
        let url = `${this.resource}/GetCurrentInfo`;
        return this.httpClient.get(url) as Observable<UserModel>;
    }

    ChangePasswordUser(entity: UserModel) {
        let url = `${this.resource}/ChangePasswordUser`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    ResetPasswordUser(entity: UserModel) {
        let url = `${this.resource}/ResetPasswordUser`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    ResetLoginAttemptUser(entity: any) {
        let url = `${this.resource}/ResetLoginAttemptUser`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }


    EmailConfirmation(confirmModel: any) {
        let url = Global.apiUrl + `/api/Verify/ConfirmEmail`;
        return this.httpClient.post(url, confirmModel) as Observable<EmailConfirmModel>;
    }


    AppointmentFeedback(appointmentId: any) {
        let url = Global.apiUrl + `/api/Verify/AppointmentFeedback/${appointmentId}`;
        return this.httpClient.get(url) as Observable<EmailConfirmModel>;
    }

    ForgotPassword(email: any, companyId: any) {
        let url = Global.apiUrl + `/api/User/ForgotPassword/${email}/${companyId}`;
        return this.httpClient.post(url, {}) as Observable<boolean>;
    }

    ResendSMSVerify(entity: any) {
        let url = Global.apiUrl + `/api/User/ResendSMSVerify`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    VerifySMS(code: any) {
        let url = Global.apiUrl + `/api/User/VerifySMS/${code}`;
        return this.httpClient.post(url, {}) as Observable<boolean>;
    }

    RecoverPassword(entity: any) {
        let url = Global.apiUrl + `/api/User/RecoverPassword`;
        return this.httpClient.post(url, entity) as Observable<UserModel>;
    }

    GetProviders() {
        let url = Global.apiUrl + `/api/User/GetProviders`;
        return this.httpClient.get(url) as Observable<UserModel[]>;
    }

    SearchHealthDataGroup(patientId: any) {
        let url = Global.apiUrl + `/api/User/SearchHealthDataGroup/${patientId}`;
        return this.httpClient.get(url) as Observable<HealthKitDataGroupModel[]>;
    }

    SearchHealthDataLine(criteria: any) {
        let url = Global.apiUrl + `/api/User/HealthDataGroupChart`;
        return this.httpClient.post(url, criteria) as Observable<HealthKitDataLine>;
    }

    GetHealthLastest(patientId: any) {
        let url = Global.apiUrl + `/api/User/GetHealthLastest/${patientId}`;
        return this.httpClient.get(url) as Observable<HealthKitDataModel[]>;
    }

    GetAllUserPatientByCompanyID() {
        let url = Global.apiUrl + `/api/User/GetAllUserPatientByCompanyID`;
        return this.httpClient.get(url) as Observable<UserModel[]>;
    }

    UpdateProfile(patientProfileId: any, user: any) {
        let url = Global.apiUrl + `/api/User/UpdateProfile/${patientProfileId}`;
        return this.httpClient.put(url, user) as Observable<boolean>;
    }

    UpdateAddress(patientProfileId: any, user: any) {
        let url = Global.apiUrl + `/api/User/UpdateAddress/${patientProfileId}`;
        return this.httpClient.put(url, user) as Observable<boolean>;
    }

    InviteUser(user: any) {
        let url = Global.apiUrl + `/api/User/InviteUser`;
        return this.httpClient.post(url, user) as Observable<boolean>;
    }

    GetProvidersForGroupAppt() {
        let url = Global.apiUrl + `/api/User/GetProvidersForGroupAppt`;
        return this.httpClient.get(url) as Observable<UserModel[]>;
    }
}