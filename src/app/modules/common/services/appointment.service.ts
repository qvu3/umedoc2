import { Prizm_IntakeModel } from './../models/prizm-intake.model';
import { DashboardCountInfoModel } from './../models/dashboard-count-info.model';
import { Injectable } from '@angular/core';
import { AppointmentModel } from '../models/appointment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService, PageData } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { ToxBoxModel } from '../models/toxbox.model';
import TransactionPaypalModel from '../models/transaction-paypal.model';
import { AuditStackAppointmentModel, AuditAppointmentReasonModel, DetectAppointmentModel } from '../models/audit-stack-appointment.model';
import { SetupIntentResponseModel, CardInfoModel } from '../models/stripe-info.model';
import StripeTransactionInfoModel from '../models/stripe-transaction-info.model';
import { ParticipantModel } from '../models/participant.model';
import { AppointmentHistoryInfoModel } from '../models/appointment-history-info.model';
import { VaccineApptSlotModel } from '../models/vaccin-appt-slot.model';
import { VaccineApptModel } from '../models/vaccin-appt.model';
import { CoinBasseChargeInfo } from '../models/coin-base-info.model';

@Injectable()
export class AppointmentService extends BaseService<AppointmentModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/Appointment`;
    }

    SendPrizmPatientPrescriptions(model){
        let url = Global.apiUrl + `/api/Appointment/SendPrizmPatientPrescriptions`;
        return this.httpClient.post(url ,model) as Observable<any>;
    }

    SendPrizmPatientNotes(model){
        let url = Global.apiUrl + `/api/Appointment/SendPrizmPatientNotes`;
        return this.httpClient.post(url ,model) as Observable<any>;
    }

    GetPrizmInfo(appointmentId){
        let url = Global.apiUrl + `/api/Appointment/GetPrizmInfo/${appointmentId}`;
        return this.httpClient.get(url) as Observable<Prizm_IntakeModel>;
    }

    GetCoinBaseInfo(appointmentId){
        let url = Global.apiUrl + `/api/Appointment/GetCoinBaseInfo/${appointmentId}`;
        return this.httpClient.get(url) as Observable<CoinBasseChargeInfo>;
    }

    CheckCancelApptPayCryto(appointmentId){
        let url = Global.apiUrl + `/api/Appointment/CancelPayWithCrypto/${appointmentId}`;
        return this.httpClient.post(url,{}) as Observable<string>;
    }

    CheckCompletedlApptPayCryto(appointmentId){
        let url = Global.apiUrl + `/api/Appointment/CompletedPayWithCrypto/${appointmentId}`;
        return this.httpClient.post(url,{}) as Observable<string>;
    }



    GetViewSubmission(id){
        let url = Global.apiUrl + `/api/Appointment/ViewSubmission/${id}`;
        return this.httpClient.get(url) as Observable<string>;
    }

    CancelledVaccineSchedulerAppointment(appointmentId) {
        let url = `${Global.apiUrl}/api/VaccineAppt/CancelledAppointment/${appointmentId}`;
        return this.httpClient.post(url, {}) as Observable<boolean>;
    }

    GetVaccineScheduleApptById(id){
        let url = Global.apiUrl + `/api/VaccineAppt/${id}`;
        return this.httpClient.get(url) as Observable<VaccineApptModel>;
    }
    GetIncludeVaccineScheduleApptById(id){
        let url = Global.apiUrl + `/api/VaccineAppt/GetIncludeById/${id}`;
        return this.httpClient.get(url) as Observable<VaccineApptModel>;
    }

    RescheduleVaccineScheduleAppt(entity){
        let url = Global.apiUrl + `/api/VaccineAppt/RescheduleAppointment`;
        return this.httpClient.post(url, entity) as Observable<string>;
    }

    CreateVaccineScheduleAppt(entity){
        let url = Global.apiUrl + `/api/VaccineAppt/CreateAppointment`;
        return this.httpClient.post(url, entity) as Observable<string>;
    }

    CreateRange(entity) {
        let url = Global.apiUrl + `/api/VaccineAppt/CreateRange`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    UpdateAppointmentSlot(entity) {
        let url = Global.apiUrl + `/api/VaccineAppt/UpdateSlot`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GetVaccineSlots(entity){
        let url = Global.apiUrl + `/api/VaccineAppt/GetVaccineSlots`;
        return this.httpClient.post(url, entity) as Observable<VaccineApptSlotModel[]>;
    }

    GetSliders() {
        let url = Global.apiUrl + `/api/Appointment/GetSliderImages`;
        return this.httpClient.get(url) as Observable<string[]>;
    }

    GetHistoryAppointOfPatientUser() {
        let url = Global.apiUrl + `/api/Appointment/GetHistoryAppointOfPatientUser`;
        return this.httpClient.get(url) as Observable<AppointmentModel[]>;
    }

    GenerateToxboxSession() {
        let url = `${this.resource}/GenerateToxboxSession`;
        return this.httpClient.get(url) as Observable<ToxBoxModel>;
    }


    PatientAppointmentByPassPayment(model) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        let url = Global.apiUrl + `/api/Appointment/PatientAppointmentByPassPayment`;
        return this.httpClient.post(url, model, { headers: headers }) as Observable<AppointmentModel>;
    }

    // GetPaymentPayPalInfo(id) {
    //     let url = Global.apiUrl + '/api/Appointment/GetPaymentPayPalInfo/' + id;
    //     return this.httpClient.get(url) as Observable<TransactionPaypalModel>;
    // }

    // RefundAppointment(entity) {
    //     let url = Global.apiUrl + '/api/Appointment/RefundAppointment';
    //     return this.httpClient.post(url, entity) as Observable<boolean>;
    // }

    GetPaymentStripeInfo(id) {
        let url = Global.apiUrl + `/api/Appointment/GetPaymentStripeInfo/${id}`;
        return this.httpClient.get(url) as Observable<StripeTransactionInfoModel>;
    }

    RefundStripeAppointment(entity) {
        let url = Global.apiUrl + '/api/Appointment/RefundingPaymentMethod';
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    ChargePaymentMethod(chargeInfo) {
        let url = Global.apiUrl + `/api/Appointment/ChargePaymentMethod`;
        return this.httpClient.post(url, chargeInfo) as Observable<boolean>;
    }

    SaveRequestAppointmentByCustomerAndCard(entity) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        let url = Global.apiUrl + `/api/Appointment/SaveRequestAppointmentByCustomerAndCard`;
        return this.httpClient.post(url, entity, { headers: headers }) as Observable<AppointmentModel>;
    }

    SaveRequestAppointmentByCustomerAndCardByCoin(entity) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        let url = Global.apiUrl + `/api/Appointment/SaveRequestAppointmentByCustomerAndCardByCoin`;
        return this.httpClient.post(url, entity, { headers: headers }) as Observable<AppointmentModel>;
    }

    SaveRequestAppointmentByCustomerAndCardFuture(entity) {
        let headers = new HttpHeaders({ 'IsFromWebApp': 'true' });
        let url = Global.apiUrl + `/api/Appointment/SaveRequestAppointmentByCustomerAndCardFuture`;
        return this.httpClient.post(url, entity, { headers: headers }) as Observable<AppointmentModel>;
    }

    RescheduleAppointment(entity) {
        let url = Global.apiUrl + `/api/Appointment/RescheduleAppointment`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    CreatePayment(entity) {
        let promise = new Promise((resolve, reject) => {
            let url = Global.apiUrl + `/api/Appointment/CreatePayment`;
            this.httpClient.post(url, entity)
                .subscribe(r => {
                    resolve(r);
                }, error => {
                    reject(error);
                })
        });
        return promise;
    }

    ExecutePayment(entity) {
        let promise = new Promise((resolve, reject) => {
            let url = Global.apiUrl + `/api/Appointment/ExecutePayment`;
            this.httpClient.post(url, entity)
                .subscribe(r => {
                    resolve(r);
                }, error => {
                    reject(error);
                })
        });
        return promise;
    }

    AppointmentConfirmation(id: string) {
        let url = Global.apiUrl + `/api/Appointment/AppointmentConfirmation/` + id;
        return this.httpClient.get(url) as Observable<AppointmentModel>;
    }

    GetById(id: string) {
        let url = Global.apiUrl + `/api/Appointment/GetById/${id}`;
        return this.httpClient.get(url) as Observable<AppointmentModel>;
    }

    GetByIdAllowAnonymous(id:string){
        let url = Global.apiUrl + `/api/Appointment/GetByIdAllowAnonymous/${id}`;
        return this.httpClient.get(url) as Observable<AppointmentModel>;
    }


    SetLiked(id) {
        let url = Global.apiUrl + `/api/Appointment/SetLiked/${id}`;
        return this.httpClient.get(url) as Observable<boolean>;
    }


    ViewCompletedNotes(note) {
        let url = Global.apiUrl + `/api/Appointment/ViewCompletedNotes`;
        return this.httpClient.post(url, note) as Observable<boolean>;
    }

    SearchHistoryAppointmentByCriteria(criteria) {
        let url = Global.apiUrl + `/api/Appointment/SearchHistoryAppointmentByCriteria`;
        return this.httpClient.post(url, criteria) as Observable<PageData<AppointmentModel>>;
    }

    InSessionAppointment(appointmentId) {
        let url = `${this.resource}/InSessionAppointment/${appointmentId}`;
        return this.httpClient.post(url, appointmentId) as Observable<AppointmentModel>;
    }

    CancelledAppointment(appointmentId) {
        let url = `${this.resource}/CancelledAppointment/${appointmentId}`;
        return this.httpClient.post(url, { 'CancelReason': '' }) as Observable<boolean>;
    }

    CancelledAppointmentWithReason(model:AppointmentModel) {
        let url = `${this.resource}/CancelledAppointment/${model.ID}`;
        return this.httpClient.post(url, model) as Observable<boolean>;
    }

    CancelledCompletedAppointmentWithReason(model:AppointmentModel) {
        let url = `${this.resource}/CancelledCompletedAppointment`;
        return this.httpClient.post(url, model) as Observable<boolean>;
    }

    CompletedAppointment(appointmentId, wasreferral) {
        let url = `${this.resource}/CompletedAppointment/${appointmentId}/${wasreferral}`;
        return this.httpClient.post(url, appointmentId) as Observable<boolean>;
    }

    GenerateTokenPublisher(sessionId) {
        let url = `${this.resource}/GenerateTokenPublisher/${sessionId}`;
        return this.httpClient.get(url) as Observable<ToxBoxModel>;
    }

    GenerateTokenSubcriber(sessionId) {
        let url = `${this.resource}/GenerateTokenSubcriber/${sessionId}`;
        return this.httpClient.get(url) as Observable<ToxBoxModel>;
    }

    GetDashboardCountInfo(fromDate, toDate) {
        let url = `${this.resource}/GetDashboardCountInfo/${fromDate ? fromDate : null}/${toDate ? toDate : null}`;
        return this.httpClient.get(url) as Observable<DashboardCountInfoModel>;
    }

    AuditAppointment(fromDate, toDate) {
        let url = `${this.resource}/AuditAppointment/${fromDate ? fromDate : null}/${toDate ? toDate : null}`;
        return this.httpClient.get(url) as Observable<Array<AuditStackAppointmentModel>>;
    }

    AuditAppointmentReason(fromDate, toDate) {
        let url = `${this.resource}/AuditAppointmentReason/${fromDate ? fromDate : null}/${toDate ? toDate : null}`;
        return this.httpClient.get(url) as Observable<Array<AuditAppointmentReasonModel>>;
    }

    GetDetectAppointment(fromDate, toDate) {
        let url = `${this.resource}/GetDetectAppointment/${fromDate ? fromDate : null}/${toDate ? toDate : null}`;
        return this.httpClient.get(url) as Observable<Array<DetectAppointmentModel>>;
    }

    ChangeProvider(appointmentId, providerId) {
        let url = `${this.resource}/ChangeProvider/${appointmentId}/${providerId}`;
        return this.httpClient.post(url, {}) as Observable<boolean>;
    }

    UpdateInsuranceInfo(model) {
        let url = `${this.resource}/UpdateInsuranceInfo`;
        return this.httpClient.post(url, model) as Observable<boolean>;
    }


    CreatePaymentMethod(model) {
        let url = `${this.resource}/CreatePaymentMethod`;
        return this.httpClient.post(url, model) as Observable<AppointmentModel>;
    }

    CreateSetupIntents() {
        let url = `${this.resource}/CreateSetupIntents`;
        return this.httpClient.get(url) as Observable<SetupIntentResponseModel>;
    }

    CheckValidCardInfoAsync(customerID, cardID) {
        let url = `${this.resource}/checkvalidcardinfo/${customerID}/${cardID}`;
        return this.httpClient.get(url) as Observable<CardInfoModel>;
    }

    CheckPatientRequestedAppointment(userId) {
        let url = `${this.resource}/checkpatientrequestedappointment/${userId}`;
        return this.httpClient.get(url) as Observable<boolean>;
    }

    SaveCustomerCardInfoAsync(token) {
        let url = `${this.resource}/SaveCustomerCardInfoAsync/${token}`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }

    createMeetingToken(appointmentId) {
        let url = `${this.resource}/meeting_token/${appointmentId}`;
        return this.http.post(url, appointmentId) as Observable<string>;
    }

    getParticipants(roomName) {
        let url = `${this.resource}/GetParticipants/${roomName}`;
        return this.http.get(url) as Observable<Array<ParticipantModel>>;
    }

    InviteGuestToVideoSession(entity) {
        let url = Global.apiUrl + `/api/Appointment/InviteGuestToVideoSession`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GetGuestAppointmentInfo(id: string) {
        let url = Global.apiUrl + `/api/Appointment/GetGuestAppointmentInfo/${id}`;
        return this.httpClient.get(url) as Observable<AppointmentModel>;
    }

    InterestHealthCoach() {
        let url = Global.apiUrl + `/api/Appointment/InterestHealthCoach`;
        return this.httpClient.post(url, null);
    }

    InterestDiabetic() {
        let url = Global.apiUrl + `/api/Appointment/InterestDiabetic`;
        return this.httpClient.post(url, null);
    }

    CapturePaymentIntent(appointmentID, amount) {
        let url = Global.apiUrl + `/api/Appointment/CapturePaymentIntent/${appointmentID}/${amount}`;
        return this.httpClient.post(url, null);
    }

    CancelledPaymentIntent(appointmentID) {
        let url = Global.apiUrl + `/api/Appointment/CancelledPaymentIntent/${appointmentID}`;
        return this.httpClient.post(url, null);
    }

    SearchAppointmentHistoryInfo(criteria) {
        let url = Global.apiUrl + `/api/Appointment/SearchAppointmentHistoryInfo`;
        return this.httpClient.post(url, criteria) as Observable<PageData<AppointmentHistoryInfoModel>>;
    }

    GetNumberAppointmentOfPatient() {
        let url = Global.apiUrl + `/api/Appointment/GetNumberAppointmentOfPatient`;
        return this.httpClient.get(url) as Observable<number>;
    }

    DeclineInvalidInsurance(apptId){
        let url = Global.apiUrl + `/api/Appointment/DeclineInvalidInsurance/${apptId}`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }

    DeclineOutOfNetwork(apptId){
        let url = Global.apiUrl + `/api/Appointment/DeclineOutOfNetwork/${apptId}`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }

    SaveAppointmentRating(entity){
        let url = Global.apiUrl + `/api/Appointment/SaveAppointmentRating`;
        return this.httpClient.post(url, entity) as Observable<AppointmentModel>;
    }

    DownloadGenerateExcelReport(criteria) {
        let url = Global.apiUrl + `/api/Appointment/GenerateExcelReport`;
        return this.http.post(url, criteria, { observe: 'response', responseType: 'blob' });
    }
}