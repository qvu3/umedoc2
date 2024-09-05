import { Injectable } from '@angular/core';
import { ProviderProfileModel } from '../models/provider-profile.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import Global from 'src/app/Global';
import { Observable } from 'rxjs';
import { ApptCategoryModel } from '../models/appt-category.model';
import { ProviderServiceAssignmentModel } from '../models/provider-service-assignment.model';
import { ProviderProfileViewModel } from '../models/provider-profile-request.model';
import { TileAvailableModel } from '../models/tile-available.model';
import { ProviderLicenseModel } from '../models/provider-license.model';
import { ProviderCountOnDateViewModel } from '../models/provider-count-on-date.model';
import UserModel from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ProviderProfileService extends BaseService<ProviderProfileModel>{
  constructor(public http: HttpClient) {
    super(http);
    this.resource = `${Global.apiUrl}/api/ProviderProfile`;
  }

  GetBackupProviders(appointmentId){
    let url = Global.apiUrl + `/api/ProviderProfile/GetBackupProviders/${appointmentId}`;
    return this.httpClient.get(url) as Observable<ProviderProfileViewModel[]>;
  }

  CountAvailable() {
    let url = Global.apiUrl + `/api/ProviderProfile/CountAvailable`;
    return this.httpClient.get(url) as Observable<number>;
  }

  GetIsAvailable(isScheduler, state) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetIsAvailable/${isScheduler}/${state}`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel[]>;
  }

  GetIsAvailableFuture() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetIsAvailableFuture`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel[]>;
  }

  GetIncludeById(id) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetIncludeById/${id}`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel>;
  }

  UpdateTransaction(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateTransaction`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }

  AutoSaveAvatar(id, avatar) {
    let url = `${Global.apiUrl}/api/ProviderProfile/${id}/AutoSaveAvatar?avatar=${avatar}`;
    return this.httpClient.post(url, avatar) as Observable<boolean>;
  }

  UpdateIsAvailable(userId, isAvailable) {
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateIsAvailable/${userId}/${isAvailable}`;
    return this.httpClient.post(url, isAvailable) as Observable<boolean>;
  }

  UpdateIsBackupAvailable(userId, isBackupAvailable){
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateIsBackupAvailable/${userId}/${isBackupAvailable}`;
    return this.httpClient.post(url, isBackupAvailable) as Observable<boolean>;
  }

  UpdateProviderIsAvailable(userId) {
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateProviderIsAvailable/${userId}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  UpdateProviderIsBackup(userId) {
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateProviderIsBackup/${userId}`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  UpdatePersonalInfo(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/PersonalInfo`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }

  UpdateAddressInfo(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/AddressInfo`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }

  UpdateMedicalProfile(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/MedicalProfile`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }


  GetIsAvailableCurrentUser() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetIsAvailableCurrentUser`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  GetIsBackupAvailableCurrentUser() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetIsBackupAvailableCurrentUser`;
    return this.httpClient.get(url) as Observable<boolean>;
  }

  SaveStaff(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/SaveStaff`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }

  GetAllProvidersByCompanyID() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetAllProvidersByCompanyID`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel[]>;
  }

  GetApptCategories() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetApptCategories`;
    return this.httpClient.get(url) as Observable<ApptCategoryModel[]>;
  }

  AddProviderService(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/AssignedProviderService`;
    return this.httpClient.post(url, entity) as Observable<boolean>;
  }

  UpdateProviderService(entity) {
    let url = Global.apiUrl + `/api/ProviderProfile/UpdateProviderService`;
    return this.httpClient.put(url, entity) as Observable<boolean>;
  }

  DeleteProviderService(id) {
    let url = Global.apiUrl + `/api/ProviderProfile/DeleteProviderService/${id}`;
    return this.httpClient.delete(url);
  }

  GetProviderService(id) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetProviderService/${id}`;
    return this.httpClient.get(url) as Observable<ProviderServiceAssignmentModel>;
  }

  GetProviders(state, gender, isOnDemand) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetProviders?state=${state}&gender=${gender}&isOnDemand=${isOnDemand}`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel[]>;
  }

  GetRequestProviders(appointment) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetRequestProviders`;
    return this.httpClient.post(url, appointment) as Observable<ProviderProfileViewModel[]>;
  }

  GetAvailableFollowUpProviders(appointment) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetAvailableFollowUpProviders`;
    return this.httpClient.post(url, appointment) as Observable<ProviderProfileViewModel[]>;
  }

  GetProviderRescheduleAvailableFuture(appointmentID) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetProviderRescheduleAvailableFuture/${appointmentID}`;
    return this.httpClient.get(url) as Observable<ProviderProfileModel[]>;
  }

  CheckTileAvailable(state) {
    let url = Global.apiUrl + `/api/ProviderProfile/CheckTileAvailable?&state=${state}`;
    return this.httpClient.get(url) as Observable<TileAvailableModel>;
  }

  GetProviderLicenses(providerId) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetProviderLicenses/${providerId}`;
    return this.httpClient.get(url) as Observable<ProviderLicenseModel[]>;
  }

  GetListAvailableApptCategory(state , isCheckSlot = true) {
    let url = Global.apiUrl + `/api/ProviderProfile/GetListAvailableApptCategory?&state=${state}&isCheckSlot=${isCheckSlot}`;
    return this.httpClient.get(url) as Observable<ApptCategoryModel[]>;
  }

  GetCountProviderOnDate(criteria){
    let url = Global.apiUrl + `/api/ProviderProfile/GetCountProviderOnDate`;
    return this.httpClient.post(url , criteria) as Observable<ProviderCountOnDateViewModel[]>;
  }

  GetProvidersForTaskList() {
    let url = Global.apiUrl + `/api/ProviderProfile/GetProvidersForTaskList`;
    return this.httpClient.get(url) as Observable<UserModel[]>;
  }
}
