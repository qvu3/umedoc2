import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from '../../../Global';
import { AppointmentSlotModel } from '../models/appointment-slot.model';
import { Observable } from 'rxjs';
import { AppointmentSlotGroupModel } from '../models/appointment-slot-group.model';
import { ApptCategoryModel } from '../models/appt-category.model';
import { ProviderCountOnDateViewModel } from '../models/provider-count-on-date.model';
import { AppointmentSlotCriteria } from '../criterias/appointment-slot.criteria';
import { AppointmentModel } from '../models/appointment.model';



@Injectable()
export class AppointmentSlotService extends BaseService<AppointmentSlotModel>{
    constructor(public http: HttpClient) {
        super(http);
        this.resource = `${Global.apiUrl}/api/AppointmentSlot`;
    }

    CountSlotsByDate(criteria: AppointmentSlotCriteria) {
        let url = Global.apiUrl + `/api/VaccineAppt/CountSlotsByDate`;
        return this.httpClient.post(url, criteria) as Observable<ProviderCountOnDateViewModel[]>;
    }

    GetAvaiableVaccineAppointmentSlots(criteria: any) {
        let url = Global.apiUrl + `/api/VaccineAppt/GetAvaiableVaccineAppointmentSlots`;
        return this.httpClient.post(url, criteria) as Observable<AppointmentSlotGroupModel>;
    }

    CreateRange(entity: AppointmentSlotModel) {
        let url = Global.apiUrl + `/api/AppointmentSlot/CreateRange`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    UpdateAppointmentSlot(entity: AppointmentSlotModel) {
        let url = Global.apiUrl + `/api/AppointmentSlot/UpdateAppointmentSlot`;
        return this.httpClient.post(url, entity) as Observable<boolean>;
    }

    GetDefaultAppointmentSlotsByProvider(criteria: any) {
        let url = Global.apiUrl + `/api/AppointmentSlot/GetDefaultAppointmentSlotsByProvider`;
        return this.httpClient.post(url, criteria) as Observable<AppointmentSlotModel[]>;
    }

    GetDefaultAppointmentSlotsByProviders(criteria: AppointmentSlotCriteria) {
        let url = Global.apiUrl + `/api/AppointmentSlot/GetDefaultAppointmentSlotsByProviders`;
        return this.httpClient.post(url, criteria) as Observable<AppointmentSlotModel[]>;
    }

    GetAppointmentSlotsByProvider(providerID: any) {
        let url = Global.apiUrl + `/api/AppointmentSlot/GetAppointmentSlotsByProvider/${providerID}`;
        return this.httpClient.get(url) as Observable<AppointmentSlotModel[]>;
    }

    GetAvaiableAppointmentSlotsByProvider(startDate: Date, providerID: string, isFU = false) {

        let url = Global.apiUrl + `/api/AppointmentSlot/GetAvaiableAppointmentSlotsByProvider`;
        return this.httpClient.post(url, { RequestDate: startDate, ProviderID: providerID, IsFU: isFU }) as Observable<AppointmentSlotGroupModel[]>;
    }

    CheckAvailableAppointSlot(appointment: AppointmentModel) {
        let url = Global.apiUrl + `/api/AppointmentSlot/CheckAvailableAppointSlot`;
        return this.httpClient.post(url, appointment) as Observable<boolean>;
    }

    GetAvaiableAppointmentSlots(appointment: { RequestDate: any; ProviderID: string; IsFU: boolean; }) {
        let url = Global.apiUrl + `/api/AppointmentSlot/GetAvaiableAppointmentSlots`;
        return this.httpClient.post(url, appointment) as Observable<AppointmentSlotGroupModel>;
    }

    GetCategory(code: any) {
        let url = Global.apiUrl + `/api/AppointmentStatus/GetApptCategory/${code}`;
        return this.httpClient.get(url) as Observable<ApptCategoryModel>;
    }
}
