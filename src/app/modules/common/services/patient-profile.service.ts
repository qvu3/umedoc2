import { Injectable } from '@angular/core';
import { PatientProfileModel } from '../models/patient-profile.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { Observable } from 'rxjs';
import { AllergyInfoModel, PharmacyModel, DoseTokenInfoModel, DosePatientPrescription } from '../models/allergy-info.model';
import UserModel from '../models/user.model';
import { PharmacyCriteria } from '../criterias/pharmacy.criteiral';

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

    Save(entity: any) {
        let url = Global.apiUrl + `/api/PatientProfile/Save`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    UpdatePatientInfo(entity: any) {
        let url = Global.apiUrl + `/api/PatientProfile/Update`;
        return this.httpClient.post(url, entity) as Observable<PatientProfileModel>;
    }

    UpdatePharmacy(entity: any) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdatePharmacy`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GetByAppointment(appointmentId: any) {
        let url = Global.apiUrl + `/api/PatientProfile/GetByAppointment?appointmentId=${appointmentId}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    GetPatientProfileById(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientProfileById/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    UpdateChildInfo(user: UserModel){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateChildInfo`;
        return this.httpClient.post(url,user) as Observable<boolean>;
    }

    DeleteChild(id: string){
        let url = Global.apiUrl + `/api/PatientProfile/DeleteChild/${id}`;
        return this.httpClient.delete(url);
    }

    CheckExistedApptCompleted(patientId: any){
        let url = Global.apiUrl + `/api/Appointment/CheckExistedApptCompleted/${patientId}`;
        return this.httpClient.get(url) as Observable<boolean>;
    }

    GetPatientProfileInfo(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientProfileInfo/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    SearchAllergy(q: any) {
        let url = Global.apiUrl + `/api/PatientProfile/SearchAllergy/${q}`;
        return this.httpClient.get(url) as Observable<AllergyInfoModel[]>;
    }

    SearchPharmacy(criteria: PharmacyCriteria) {
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

    GetPatientPrescriptionByPatient(patientId: string){
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

    UpdateInsurance(model: any) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateInsurance`;
        return this.httpClient.post(url, model) as Observable<boolean>;
    }

    createOrUpdateCardInfo(cardInfo: any) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateCardInfo`;
        return this.http.post(url, cardInfo) as Observable<boolean>;
    }

    GetInsurances(patientId: any) {
        let url = Global.apiUrl + `/api/PatientProfile/GetInsurances/${patientId}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }

    UpdateEmergency(patient: any) {
        let url = Global.apiUrl + `/api/PatientProfile/UpdateEmergency`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateAllergies(patient: any){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateAllergies`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }
 
    UpdateMedicationConditions(patient: any){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateMedicationConditions`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateMedications(patient: any){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateMedications`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    CreateChild(patient: PatientProfileModel){
        let url = Global.apiUrl + `/api/PatientProfile/CreateChild`;
        return this.httpClient.post(url, patient) as Observable<PatientProfileModel>;
    }

    UpdateDiscoverFrom(entity: any){
        let url = Global.apiUrl + `/api/PatientProfile/UpdateDiscoverFrom`; 
        return this.httpClient.post(url, entity) as Observable<PatientProfileModel>;
    }
 
    GetPatientForBlockedList(id: string) {
        let url = Global.apiUrl + `/api/PatientProfile/GetPatientForBlockedList/${id}`;
        return this.httpClient.get(url) as Observable<PatientProfileModel>;
    }
}
