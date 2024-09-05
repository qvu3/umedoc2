import { PrizmPatientNoteComponent } from './components/completed-appointments/prizm-patient-note/prizm-patient-note.component';
import { PatientRequestComponent } from './components/patient-request/patient-request.component';
import { ProviderViewCalendarComponent } from './components/provider-view-calendar/provider-view-calendar.component';
import { ProviderAppointmentSlotComponent } from './components/provider-appointment-slot/provider-appointment-slot.component';
import { AdminTicketDetailComponent } from './components/admin-ticket-detail/admin-ticket-detail.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../common/guard/guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleConstants } from 'src/app/Global';
import { CompanyComponent } from './components/company/company.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditMyProfileComponent } from './components/edit-my-profile/edit-my-profile.component';
import { RequestedAppointmentsComponent } from './components/requested-appointments/requested-appointments.component';
import { CompletedAppointmentsComponent } from './components/completed-appointments/completed-appointments.component';
import { ManagementPatientsComponent } from './components/management-patients/management-patients.component';
import { PatientDetailViewComponent } from './components/patient-detail-view/patient-detail-view.component';
import { CompletedAppointmentDetailComponent } from './components/completed-appointments/completed-appointment-detail/completed-appointment-detail.component';
import { ManageStaffsComponent } from './components/manage-staffs/manage-staffs.component';
import { EditStaffProfileComponent } from './components/manage-staffs/edit-staff-profile/edit-staff-profile.component';
import { OpenTokProviderCallComponent } from './components/requested-appointments/open-tok-provider-call/open-tok-provider-call.component';
import { AddStaffProfileComponent } from './components/manage-staffs/add-staff-profile/add-staff-profile.component';
import { AppointmentReasonComponent } from './components/appointment-reason/appointment-reason.component';
import { MyAppointmentSlotComponent } from './components/appointment-slot/my-appointment-slot/my-appointment-slot.component';
import { ManageAppointmentSlotComponent } from './components/appointment-slot/manage-appointment-slot/manage-appointment-slot.component';
import { RequestAppointmentInfoComponent } from './components/requested-appointments/request-appointment-info/request-appointment-info.component';
import { AppointmentInfoComponent } from './components/appointment-info/appointment-info.component';
import { AppointmentHistoryInfoComponent } from './components/appointment-history-info/appointment-history-info.component';
import { AppointmentClincialNoteComponent } from './components/completed-appointments/appointment-clincial-note/appointment-clincial-note.component';
import { PatientStorageComponent } from '../home/components/patient-profile-new/patient-storage/patient-storage.component';
import { AppointmentPaymentComponent } from './components/completed-appointments/appointment-payment/appointment-payment.component';
import { ProviderTaskListComponent } from './components/provider-task-list/provider-task-list.component';
import { ProviderTaskToDoComponent } from './components/provider-task-list/provider-task-to-do/provider-task-to-do.component';
import { ProviderTaskCompletedComponent } from './components/provider-task-list/provider-task-completed/provider-task-completed.component';
import { SmsHistoryComponent } from './components/sms-history/sms-history.component';
import { IncomingSmsComponent } from './components/sms-history/incoming-sms/incoming-sms.component';
import { OutgoingSmsComponent } from './components/sms-history/outgoing-sms/outgoing-sms.component';
import { RestrictedPatientLogComponent } from './components/restricted-patient-log/restricted-patient-log.component';
import { TaskListPatientComponent } from './components/completed-appointments/task-list-patient/task-list-patient.component';
import { PatientAppointmentHistoryInfoTabComponent } from './components/patient-detail-view/patient-appointment-history-info-tab/patient-appointment-history-info-tab.component';
import { PatientTaskListTabComponent } from './components/patient-detail-view/patient-task-list-tab/patient-task-list-tab.component';
import { WarningVerifiedComponent } from './components/warning-verified/warning-verified.component';
import { ProviderGroupComponent } from './components/provider-group/provider-group.component';
import { ProviderPersonalInfoComponent } from './components/edit-my-profile/provider-personal-info/provider-personal-info.component';
import { ProviderAddressComponent } from './components/edit-my-profile/provider-address/provider-address.component';
import { ProviderMedicalProfileComponent } from './components/edit-my-profile/provider-medical-profile/provider-medical-profile.component';
import { ProviderServicesComponent } from './components/edit-my-profile/provider-services/provider-services.component';
import { ApptStatusHistoriesComponent } from './components/appt-status-histories/appt-status-histories.component';
import { PersonalInfoTabComponent } from './components/patient-detail-view/personal-info-tab/personal-info-tab.component';
import { AddressInfoTabComponent } from './components/patient-detail-view/address-info-tab/address-info-tab.component';
import { EmergencyContactTabComponent } from './components/patient-detail-view/emergency-contact-tab/emergency-contact-tab.component';
import { InsuranceInfoComponent } from '../patient/components/insurance-info/insurance-info.component';
import { PatientInsuranceComponent } from '../home/components/patient-profile-new/patient-insurance/patient-insurance.component';
import { CreditCardNewComponent } from '../home/components/patient-profile-new/credit-card-new/credit-card-new.component';
import { PatientPreferPharmacyComponent } from '../home/components/patient-profile-new/patient-prefer-pharmacy/patient-prefer-pharmacy.component';
import { MedicalDocumentsTabComponent } from './components/patient-detail-view/medical-documents-tab/medical-documents-tab.component';
import { AllergiesTabComponent } from './components/patient-detail-view/allergies-tab/allergies-tab.component';
import { MedicalConditionsTabComponent } from './components/patient-detail-view/medical-conditions-tab/medical-conditions-tab.component';
import { MedicationsTabComponent } from './components/patient-detail-view/medications-tab/medications-tab.component';
import { PatientPrescriptionNewComponent } from '../home/components/patient-profile-new/patient-prescription/patient-prescription.component';
import { ProviderStorageComponent } from './components/edit-my-profile/provider-storage/provider-storage.component';
import { InsuranceBalanceBillingsComponent } from './components/insurance-balance-billings/insurance-balance-billings.component';
import { ProviderLicensesServicesComponent } from './components/edit-my-profile/provider-licenses-services/provider-licenses-services.component';
import { LoginHistoryTabComponent } from './components/patient-detail-view/login-history-tab/login-history-tab.component';
import { StaffLoginHistoryComponent } from './components/manage-staffs/staff-login-history/staff-login-history.component';
import { PageViewHistoryTabComponent } from './components/patient-detail-view/page-view-history-tab/page-view-history-tab.component';
import { SeachDosePharmacyComponent } from './components/seach-dose-pharmacy/seach-dose-pharmacy.component';
import { AppointmentPrescriptionHistoryInfoComponent } from './components/completed-appointments/appointment-prescription-history-info/appointment-prescription-history-info.component';
import { ManagementPatientPaymentHistoryComponent } from './components/management-patient-payment-history/management-patient-payment-history.component';
import { RainfoPersonalInfoComponent } from './components/requested-appointments/request-appointment-info/rainfo-personal-info/rainfo-personal-info.component';
import { RaiApptHistoryInfoComponent } from './components/requested-appointments/request-appointment-info/rai-appt-history-info/rai-appt-history-info.component';
import { RaiExHistoryComponent } from './components/requested-appointments/request-appointment-info/rai-ex-history/rai-ex-history.component';
import { RaiCreditCardInsuranceInfoComponent } from './components/requested-appointments/request-appointment-info/rai-credit-card-insurance-info/rai-credit-card-insurance-info.component';
import { RaiMedicalDocumentInfoComponent } from './components/requested-appointments/request-appointment-info/rai-medical-document-info/rai-medical-document-info.component';
import { PatientChildrenViewComponent } from './components/patient-detail-view/patient-children-view/patient-children-view.component';
import { VaccineAppointmentComponent } from './components/vaccine-appointment/vaccine-appointment.component';
import { ManageVaccineApptSlotComponent } from './components/manage-vaccine-appt-slot/manage-vaccine-appt-slot.component';
import { VaccineAppointmentDetailComponent } from './components/vaccine-appointment/vaccine-appointment-detail/vaccine-appointment-detail.component';
import { GroupApptComponent } from './components/group-appt/group-appt.component';
import { GroupApptDetailsComponent } from './components/group-appt/group-appt-details/group-appt-details.component';
import { ViewReviewsComponent } from './components/view-reviews/view-reviews.component';
import { GenerateExcelReportComponent } from './components/generate-excel-report/generate-excel-report.component';
import { ManagementPverifyPayerListComponent } from './components/management-pverify-payer-list/management-pverify-payer-list.component';

const main_Routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Dashboard' }
    },
    {
        path: 'tickets', component: TicketsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Ticket' }
    },
    {
        path: 'patient-requests', component: PatientRequestComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Patient-Request' }
    },
    {
        path: 'admin-ticket-detail/:id', component: AdminTicketDetailComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Ticket-Detail' }
    },
    {
        path: 'vaccine-appt-detail/:id', component: VaccineAppointmentDetailComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Vaccine-Appt-Detail' }
    },
    {
        path: 'vaccine-appts', component: VaccineAppointmentComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Vaccine-Appt' }
    },
    {
        path: 'manage-vaccine-appt-slots', component: ManageVaccineApptSlotComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Vaccine-Appt-Slot' }
    },
    {
        path: 'company-settings', component: CompanyComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Company-Settings' }
    },
    {
        path: 'my-profile', component: MyProfileComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-My-Profile' }
    },
    {
        path: 'appointment-reasons', component: AppointmentReasonComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Reasons' }
    },
    {
        path: 'edit-my-profile', component: EditMyProfileComponent,
        //canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider] },
        children: [
            { path: 'personal-info', component: ProviderPersonalInfoComponent, canActivate: [AuthGuard], data: { pageName: 'Management-Edit-Profile-Personal-Info' } },
            { path: 'address', component: ProviderAddressComponent, canActivate: [AuthGuard], data: { pageName: 'Management-Edit-Profile-Address' } },
            { path: 'medical-profile', component: ProviderMedicalProfileComponent, canActivate: [AuthGuard], data: { pageName: 'Management-Edit-Profile-Medical-Profile' } },
            { path: 'licenses-services', component: ProviderLicensesServicesComponent, canActivate: [AuthGuard], data: { pageName: 'Management-Edit-Profile-Licenses-Services' } },
            { path: 'provider-storages', component: ProviderStorageComponent, data: { pageName: 'Management-Edit-Profile-Provider-Storeages' } },
            { path: '**', redirectTo: 'personal-info', pathMatch: 'full' },
        ]
    },
    {
        path: 'requested-appointments', component: RequestedAppointmentsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Request-Appointments' }
    },
    {
        path: 'call-appointment/:{id}', component: OpenTokProviderCallComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Call-Appointment' }
    },
    {
        path: 'completed-appointments', component: CompletedAppointmentsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Completed-Appointments' }
    },
    {
        path: 'warning-verified', component: WarningVerifiedComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Warning-Verify' }
    },
    {
        path: 'sms-history', component: SmsHistoryComponent,
        children: [
            { path: 'incoming-sms', component: IncomingSmsComponent, data: { pageName: 'Management-Incoming-SMS' } },
            { path: 'outgoing-sms', component: OutgoingSmsComponent, data: { pageName: 'Management-OutGoing-SMS' } },
            { path: '**', redirectTo: 'incoming-sms', pathMatch: 'full' }
        ],
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin] }
    },
    {
        path: 'completed-appointment-details/:{id}', component: CompletedAppointmentDetailComponent,
        children: [
            { path: 'appointment-info', component: AppointmentInfoComponent, data: { pageName: 'Management-Appt-Detail-Info' } },
            { path: 'appointment-status-histories', component: ApptStatusHistoriesComponent, data: { pageName: 'Management-Appt-Detail-Status-Histories' } },
            { path: 'appointment-patient-storage', component: PatientStorageComponent, data: { pageName: 'Management-Appt-Detail-Patient-Storages' } },
            { path: 'appointment-clincial-note', component: AppointmentClincialNoteComponent, data: { pageName: 'Management-Appt-Detail-Clincial-Note' } },
            { path: 'appointment-history-info', component: AppointmentHistoryInfoComponent, data: { pageName: 'Management-Appt-Detail-History-Info' } },
            { path: 'appointment-payment', component: AppointmentPaymentComponent, data: { pageName: 'Management-Appt-Detail-Paymment' } },
            { path: 'appointment-prescription-history', component: AppointmentPrescriptionHistoryInfoComponent, data: { pageName: 'Management-Appt-Detail-Prescription-History' } },
            { path: 'task-list/:patientId', component: TaskListPatientComponent, data: { pageName: 'Management-Appt-Detail-Task-List' } },
            { path: 'prizm-patient-note/:patientId', component: PrizmPatientNoteComponent, data: { pageName: 'Management-Appt-Detail-Prizm-Patient-Note' } },
            { path: '**', redirectTo: 'appointment-info', pathMatch: 'full' }
        ],
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider] }
    },
    {
        path: 'requested-appointment-details/:{id}', component: RequestAppointmentInfoComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Request-Appt-Detail' }
        , children: [
            { path: '', redirectTo: 'personal-info-tab', pathMatch: 'full' },
            { path: 'medical-document-info-tab', component: RaiMedicalDocumentInfoComponent, data: { pageName: 'Request-Appointment-Medical-Document-Info-Tab' } },
            { path: 'credit-card-insurance-info-tab', component: RaiCreditCardInsuranceInfoComponent, data: { pageName: 'Request-Appointment-Credit-Card-Insurance-Info-Tab' } },
            { path: 'ex-history-info-tab', component: RaiExHistoryComponent, data: { pageName: 'Request-Appointment-Ex-History-Info-Tab' } },
            { path: 'personal-info-tab', component: RainfoPersonalInfoComponent, data: { pageName: 'Request-Appointment-Personal-Info-Tab' } },
            { path: 'appt-history-info-tab', component: RaiApptHistoryInfoComponent, data: { pageName: 'Request-Appointment-Appt-History-Info-Tab' } },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    {
        path: 'patient-detail-view/:{id}', component: PatientDetailViewComponent,
        children: [
            { path: 'patient-info-tab', component: PersonalInfoTabComponent, data: { pageName: 'Management-Patient-Info-Tab' } },
            { path: 'address-info-tab', component: AddressInfoTabComponent, data: { pageName: 'Management-Patient-Address-Info-Tab' } },
            { path: 'emergency-contact-tab', component: EmergencyContactTabComponent, data: { pageName: 'Management-Patient-Emergency-Tab' } },
            { path: 'insurances-tab', component: PatientInsuranceComponent, data: { pageName: 'Management-Patient-Insurance-Info-Tab' } },
            { path: 'credit-card-tab', component: CreditCardNewComponent, data: { pageName: 'Management-Patient-Credit-Card-Info-Tab' } },
            { path: 'prefer-pharmacy-tab', component: PatientPreferPharmacyComponent, data: { pageName: 'Management-Patient-Preferred-Pharmacy-Info-Tab' } },
            { path: 'medical-documents-tab', component: MedicalDocumentsTabComponent, data: { pageName: 'Management-Patient-Medical-Document-Info-Tab' } },
            { path: 'children-tab', component: PatientChildrenViewComponent, data: { pageName: 'Management-Patient-Children-Tab' } },
            { path: 'allergies-tab', component: AllergiesTabComponent, data: { pageName: 'Management-Patient-Allergies-Info-Tab' } },
            { path: 'medical-conditions-tab', component: MedicalConditionsTabComponent, data: { pageName: 'Management-Patient-Medical-Condition-Info-Tab' } },
            { path: 'medications-tab', component: MedicationsTabComponent, data: { pageName: 'Management-Patient-Insurance-Medications-Tab' } },
            { path: 'patient-appointment-history-info-tab', component: PatientAppointmentHistoryInfoTabComponent, data: { pageName: 'Management-Patient-Appointment-History-Info-Tab' } },
            { path: 'patient-task-list-tab', component: PatientTaskListTabComponent, data: { pageName: 'Management-Patient-Task-List-Info-Tab' } },
            { path: 'patient-prescription-history-info-tab', component: PatientPrescriptionNewComponent, data: { pageName: 'Management-Patient-Prescription-History-Info-Tab' } },
            { path: 'patient-login-history-info-tab', component: LoginHistoryTabComponent, data: { pageName: 'Management-Patient-Login-History-Info-Tab' } },
            { path: 'patient-page-view-history-tab', component: PageViewHistoryTabComponent, data: { pageName: 'Management-Patient-Page-View-History-Tab' } },
            { path: '**', redirectTo: 'patient-info-tab', pathMatch: 'full' }
        ],
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider] }
    },
    {
        path: 'manage-patients', component: ManagementPatientsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Patient-List' },
    },
    {
        path: 'manage-insurance-balance-billings', component: InsuranceBalanceBillingsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Insurance-Balance-Billings' }
    },
    {
        path: 'management-patient-payment-history', component: ManagementPatientPaymentHistoryComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Patient-Payment-History' }
    },
    {
        path: 'manage-staffs', component: ManageStaffsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Staff-List' }
    },
    {
        path: 'edit-staff-profile/:{id}', component: EditStaffProfileComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin] },
        children: [
            { path: 'personal-info', component: ProviderPersonalInfoComponent, data: { pageName: 'Management-Edit-Staff-Personal-Info' } },
            { path: 'address', component: ProviderAddressComponent, data: { pageName: 'Management-Edit-Staff-Address-Info' } },
            { path: 'medical-profile', component: ProviderMedicalProfileComponent, data: { pageName: 'Management-Edit-Staff-Medical-Profile-Info' } },
            { path: 'provider-storages', component: ProviderStorageComponent, data: { pageName: 'Management-Edit-Staff-Provider-Storages-Info' } },
            { path: 'licenses-services', component: ProviderLicensesServicesComponent, data: { pageName: 'Management-Edit-Staff-License-Services-Info' } },
            { path: 'login-histories', component: StaffLoginHistoryComponent, data: { pageName: 'Management-Edit-Staff-Login-History-Info' } },
            { path: '**', redirectTo: 'personal-info', pathMatch: 'full' },
        ]
    }, {
        path: 'add-staff-profile', component: AddStaffProfileComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Add-Staff' }
    },
    {
        path: 'provider-groups', component: ProviderGroupComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-Provider-Group' }
    },
    {
        path: 'my-appointment-slot', component: MyAppointmentSlotComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'My-Appointment-Slot' }
    },
    {
        path: 'provider-view-calendar', component: ProviderViewCalendarComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Provider-View-Calendar' }
    },
    {
        path: 'provider-appointment-slots', component: ProviderAppointmentSlotComponent,
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Provider-Appointment-Slots' }
    }
    , {
        path: 'manage-appointment-slot/:{id}', component: ManageAppointmentSlotComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Appointment-Slot' }
    }, {
        path: 'provider-task-list', component: ProviderTaskListComponent,
        children: [
            { path: 'provider-task-to-do', component: ProviderTaskToDoComponent, data: { pageName: 'Management-Provider-Task-List-To-Do' } },
            { path: 'provider-task-completed', component: ProviderTaskCompletedComponent, data: { pageName: 'Management-Provider-Task-List-Completed' } },
            { path: '**', redirectTo: 'provider-task-to-do', pathMatch: 'full' }
        ],
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider] }
    }, {
        path: 'restricted-patient-logs', component: RestrictedPatientLogComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], data: { pageName: 'Management-Restricted-Patient-Logs' } }
    },
    {
        path: 'insurance-list', component: ManagementPverifyPayerListComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], data: { pageName: 'Management-Pverify-Payer-List' } }
    },
    {
        path: 'search-dosespot-pharmacy', component: SeachDosePharmacyComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Search-DoseSpot-Pharmacy' }
    },
    {
        path: 'group-appt', component: GroupApptComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Group Appt' }
    },
    {
        path: 'group-appt-detail/:{id}', component: GroupApptDetailsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Group Appt Details' }
    }, {
        path: 'view-reviews', component: ViewReviewsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin], pageName: 'Management-View-Reviews' }
    },
    {
        path: 'generate-excel-report', component: GenerateExcelReportComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.SpecialAdmin, RoleConstants.CompanyAdmin, RoleConstants.Provider], pageName: 'Management-Generate-Excel-Report' }
    },
];
@NgModule({
    imports: [RouterModule.forChild(main_Routes)],
    exports: [RouterModule]
})
export class mainRoutes { }
