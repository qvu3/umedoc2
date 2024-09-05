import { Injectable } from '@angular/core';
import { PatientProfileModel } from '../models/patient-profile.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { AllergyInfoModel, PharmacyModel, DoseTokenInfoModel, DosePatientPrescription } from '../models/allergy-info.model';

@Injectable()
export class PatientProfileService extends BaseService<PatientProfileModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/PatientProfile`;
    }

    GetIncludePatientUser(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetById/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    GetChildren(parentId:string){
        let url = Global.apiUrl + `/api/PatientProfile/GetChildren/${parentId}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel[]>;
    }

    Save(entity) {
        let url = Global.apiUrl + `/api/PatientProfile/Save`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    UpdatePatientInfo(entity) {
        let url = Global.apiUrl + `/api/PatientProfile/Update`;
        return this.httpClient.post(url, entity) as Observable<PatientProfileModel>;
    }

    UpdatePharmacy(entity) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdatePharmacy`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GetByAppointment(appointmentId) {
        let url = Global.apiUrl + `/api/PatientProfile/GetByAppointment?appointmentId=${appointmentId}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    GetPatientProfileById(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientProfileById/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    UpdateChildInfo(user){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateChildInfo`;
        return this.httpClient.post(url,user) as Observable<boolean>;
    }

    DeleteChild(id){
        let url = Global.apiUrl + `/api/PatientProfile/DeleteChild/${id}`;
        return this.httpClient.delete(url);
    }

    CheckExistedApptCompleted(patientId){
        let url = Global.apiUrl + `/api/Appointment/CheckExistedApptCompleted/${patientId}`;
        return this.httpClient.get(url) as Observable<boolean>;
    }

    GetPatientProfileInfo(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientProfileInfo/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    SearchAllergy(q) {
        let url = Global.apiUrl + `/api/PatientProfile/SearchAllergy/${q}`;
        return this.httpClient.get(url) as Observable<AllergyInfoModel[]>;
    }

    SearchPharmacy(criteria) {
        let url = Global.apiUrl + `/api/PatientProfile/SearchPharamcy`;
        return this.httpClient.post(url, criteria) as Observable<PharmacyModel[]>;
    }

    GetDoseTokenInfo() {
        let url = Global.apiUrl + `/api/PatientProfile/GetTokenDoseInfo`;
        return this.httpClient.get(url) as Observable<DoseTokenInfoModel>;
    }

    GetPatientPrescription(ds_patientId: number) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientPrescription/${ds_patientId}`;
        return this.httpClient.get(url) as Observable<Array<DosePatientPrescription>>;
    }

    GetCurrentPatientPrescription() {
        let url = Global.apiUrl + `/api/PatientProfile/GetCurrentPatientPrescription`;
        return this.httpClient.get(url) as Observable<Array<DosePatientPrescription>>;
    }

    GetPatientPrescriptionByPatient(patientId){
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientPrescriptionByPatient/${patientId}`;
        return this.httpClient.get(url) as Observable<Array<DosePatientPrescription>>;
    }

    CountDoseNotification() {
        let url = Global.apiUrl + `/api/PatientProfile/CountDoseNotification`;
        return this.httpClient.get(url) as Observable<number>;
    }

    RemoveInsurance() {
        let url = Global.apiUrl + `/api/PatientProfile/RemoveInsurance`;
        return this.httpClient.post(url, null) as Observable<boolean>;
    }

    UpdateInsurance(model) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateInsurance`;
        return this.httpClient.post(url, model) as Observable<boolean>;
    }

    createOrUpdateCardInfo(cardInfo) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateCardInfo`;
        return this.http.post(url, cardInfo) as Observable<boolean>;
    }

    GetInsurances(patientId) {
        let url = Global.apiUrl + `/api/PatientProfile/GetInsurances/${patientId}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    UpdateEmergency(patient) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateEmergency`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateAllergies(patient){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateAllergies`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }
 
    UpdateMedicationConditions(patient){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateMedicationConditions`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateMedications(patient){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateMedications`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    CreateChild(patient){
        let url = Global.apiUrl + `/api/PatientProfile/CreateChild`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateDiscoverFrom(entity){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateDiscoverFrom`; 
        return this.httpClient.post(url, entity) as Observable<PatientProfileModel>;
    }
 
    GetPatientForBlockedList(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientForBlockedList/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }
}
