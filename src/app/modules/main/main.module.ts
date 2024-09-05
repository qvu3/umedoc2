import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'
import { mainRoutes } from './main.routing';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../common/common.module';
import { CustomFormsModule } from 'ng2-validation';
import { ModalModule } from "ngx-bootstrap";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { TextMaskModule } from 'angular2-text-mask';
import { CompanyComponent } from './components/company/company.component';
import { CompanyInfoComponent } from './components/company/company-info/company-info.component';


import { ArchwizardModule } from 'angular-archwizard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditMyProfileComponent } from './components/edit-my-profile/edit-my-profile.component';
import { RequestedAppointmentsComponent } from './components/requested-appointments/requested-appointments.component';
import { CompletedAppointmentsComponent } from './components/completed-appointments/completed-appointments.component';

import { PaymentAppointmentInfoComponent } from './components/payment-appointment-info/payment-appointment-info.component';
import { GenerateAndFaxComponent } from './components/generate-and-fax/generate-and-fax.component';
import { AppointmentDocumentComponent } from './components/appointment-document/appointment-document.component';
import { FaxNotificationViewComponent } from './components/fax-notification-view/fax-notification-view.component';
import { AppointmentHistoryInfoComponent } from './components/appointment-history-info/appointment-history-info.component';
import { PatientProfileViewComponent } from './components/patient-profile-view/patient-profile-view.component';
import { ManagementPatientsComponent } from './components/management-patients/management-patients.component';
import { AppointmentInfoComponent } from './components/appointment-info/appointment-info.component';
import { FaxDocumentCompanyComponent } from './components/fax-document-company/fax-document-company.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddNoteComponent } from './components/note/add-note/add-note.component';
import { PreviewPdfComponent } from './components/note/preview-pdf/preview-pdf.component';
import { RefundPaymentComponent } from './components/refund-payment/refund-payment.component';
import { PatientDetailViewComponent } from './components/patient-detail-view/patient-detail-view.component';
import { HomeModule } from '../home/home.module';
import { CompanySettingComponent } from './components/company/company-setting/company-setting.component';
import { RequestAppointmentDetailComponent } from './components/requested-appointments/request-appointment-detail/request-appointment-detail.component';
import { CompletedAppointmentDetailComponent } from './components/completed-appointments/completed-appointment-detail/completed-appointment-detail.component';
import { VideoCallRequestComponent } from './components/requested-appointments/video-call-request/video-call-request.component';
import { ManageStaffsComponent } from './components/manage-staffs/manage-staffs.component';
import { EditStaffProfileComponent } from './components/manage-staffs/edit-staff-profile/edit-staff-profile.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { OpenTokProviderCallComponent } from './components/requested-appointments/open-tok-provider-call/open-tok-provider-call.component';
import { AppointmentAuditComponent } from './components/dashboard/appointment-audit/appointment-audit.component';
import { AppointmentReasonChartComponent } from './components/dashboard/appointment-reason-chart/appointment-reason-chart.component';
import { AddStaffProfileComponent } from './components/manage-staffs/add-staff-profile/add-staff-profile.component';
import { ChangeProviderComponent } from './components/requested-appointments/change-provider/change-provider.component';
import { AppointmentReasonComponent } from './components/appointment-reason/appointment-reason.component';
import { AppointmentReasonInfoComponent } from './components/appointment-reason/appointment-reason-info/appointment-reason-info.component';
import { NgxSortableModule } from 'ngx-sortable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/services/token.interceptor';
import { ManageAppointmentSlotComponent } from './components/appointment-slot/manage-appointment-slot/manage-appointment-slot.component';
import { MyAppointmentSlotComponent } from './components/appointment-slot/my-appointment-slot/my-appointment-slot.component';
import { RequestAppointmentInfoComponent } from './components/requested-appointments/request-appointment-info/request-appointment-info.component';
import { AddNoteInfoComponent } from './components/requested-appointments/add-note-info/add-note-info.component';
import { AddIcdModalComponent } from './components/requested-appointments/add-icd-modal/add-icd-modal.component';
import { NgSelect2Module } from 'ng-select2';
import { ChargePaymentModalComponent } from './components/payment-appointment-info/charge-payment-modal/charge-payment-modal.component';
import { FutureAppointmentComponent } from './components/future-appointment/future-appointment.component';
import { ParticipantInfoComponent } from './components/requested-appointments/participant-info/participant-info.component';
import { WriteWorkReleaseComponent } from './components/requested-appointments/write-work-release/write-work-release.component';
import { CkeditorClassicComponent } from '../common/component/ckeditor-classic/ckeditor-classic.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePatientComponent } from './components/requested-appointments/signature-patient/signature-patient.component';
import { PaymentHistoryInfoComponent } from './components/payment-history-info/payment-history-info.component';
import { HealthDataPatientComponent } from './components/health-data-patient/health-data-patient.component';
import { InviteGuestToVideoComponent } from './components/requested-appointments/invite-guest-to-video/invite-guest-to-video.component';
import { AppointmentClincialNoteComponent } from './components/completed-appointments/appointment-clincial-note/appointment-clincial-note.component';
import { AppointmentPaymentComponent } from './components/completed-appointments/appointment-payment/appointment-payment.component';
import { ProviderTaskListComponent } from './components/provider-task-list/provider-task-list.component';
import { ProviderTaskToDoComponent } from './components/provider-task-list/provider-task-to-do/provider-task-to-do.component';
import { ProviderTaskCompletedComponent } from './components/provider-task-list/provider-task-completed/provider-task-completed.component';
import { ProviderTaskInfoComponent } from './components/provider-task-list/provider-task-info/provider-task-info.component';
import { HealthDataCardComponent } from './components/health-data-card/health-data-card.component';
import { SmsHistoryComponent } from './components/sms-history/sms-history.component';
import { IncomingSmsComponent } from './components/sms-history/incoming-sms/incoming-sms.component';
import { OutgoingSmsComponent } from './components/sms-history/outgoing-sms/outgoing-sms.component';
import { CancelReasonModalComponent } from './components/requested-appointments/cancel-reason-modal/cancel-reason-modal.component';
import { RestrictedPatientLogComponent } from './components/restricted-patient-log/restricted-patient-log.component';
import { TaskListPatientComponent } from './components/completed-appointments/task-list-patient/task-list-patient.component';
import { PatientDetailInfoTabComponent } from './components/patient-detail-view/patient-detail-info-tab/patient-detail-info-tab.component';
import { PatientAppointmentHistoryInfoTabComponent } from './components/patient-detail-view/patient-appointment-history-info-tab/patient-appointment-history-info-tab.component';
import { PatientTaskListTabComponent } from './components/patient-detail-view/patient-task-list-tab/patient-task-list-tab.component';
import { WriteLabOrderComponent } from './components/requested-appointments/write-lab-order/write-lab-order.component';
import { SignatureProviderComponent } from './components/requested-appointments/signature-provider/signature-provider.component';
import { WriteLabOrderPreviewComponent } from './components/requested-appointments/write-lab-order-preview/write-lab-order-preview.component';
import { WarningVerifiedComponent } from './components/warning-verified/warning-verified.component';
import { ProviderGroupComponent } from './components/provider-group/provider-group.component';
import { EditProviderGroupComponent } from './components/provider-group/edit-provider-group/edit-provider-group.component';
import { ProviderGroupAssignmentElementComponent } from './components/provider-group/provider-group-assignment-element/provider-group-assignment-element.component';
import { ProviderPersonalInfoComponent } from './components/edit-my-profile/provider-personal-info/provider-personal-info.component';
import { ProviderAddressComponent } from './components/edit-my-profile/provider-address/provider-address.component';
import { ProviderMedicalProfileComponent } from './components/edit-my-profile/provider-medical-profile/provider-medical-profile.component';
import { ProviderServicesComponent } from './components/edit-my-profile/provider-services/provider-services.component';
import { EditProviderServiceComponent } from './components/edit-my-profile/provider-services/edit-provider-service/edit-provider-service.component';
import { CaptureFundsModalComponent } from './components/payment-appointment-info/capture-funds-modal/capture-funds-modal.component';
import { ApptStatusHistoriesComponent } from './components/appt-status-histories/appt-status-histories.component';
import { AddressInfoTabComponent } from './components/patient-detail-view/address-info-tab/address-info-tab.component';
import { PersonalInfoTabComponent } from './components/patient-detail-view/personal-info-tab/personal-info-tab.component';
import { EmergencyContactTabComponent } from './components/patient-detail-view/emergency-contact-tab/emergency-contact-tab.component';
import { MedicalDocumentsTabComponent } from './components/patient-detail-view/medical-documents-tab/medical-documents-tab.component';
import { AllergiesTabComponent } from './components/patient-detail-view/allergies-tab/allergies-tab.component';
import { MedicalConditionsTabComponent } from './components/patient-detail-view/medical-conditions-tab/medical-conditions-tab.component';
import { MedicationsTabComponent } from './components/patient-detail-view/medications-tab/medications-tab.component';
import { ProviderStorageComponent } from './components/edit-my-profile/provider-storage/provider-storage.component';
import { InsuranceBalanceBillingsComponent } from './components/insurance-balance-billings/insurance-balance-billings.component';
import { InsuranceBalanceBillingModalComponent } from './components/insurance-balance-billings/insurance-balance-billing-modal/insurance-balance-billing-modal.component';
import { ProviderLicensesComponent } from './components/edit-my-profile/provider-licenses/provider-licenses.component';
import { ProviderLicenseInfoComponent } from './components/edit-my-profile/provider-licenses/provider-license-info/provider-license-info.component';
import { ProviderLicensesServicesComponent } from './components/edit-my-profile/provider-licenses-services/provider-licenses-services.component';
import { LoginHistoryTabComponent } from './components/patient-detail-view/login-history-tab/login-history-tab.component';
import { StaffLoginHistoryComponent } from './components/manage-staffs/staff-login-history/staff-login-history.component';
import { PageViewHistoryTabComponent } from './components/patient-detail-view/page-view-history-tab/page-view-history-tab.component';
import { SeachDosePharmacyComponent } from './components/seach-dose-pharmacy/seach-dose-pharmacy.component';
import { InsuranceBalanceBillingViewerComponent } from './components/insurance-balance-billings/insurance-balance-billing-viewer/insurance-balance-billing-viewer.component';
import { AppointmentPrescriptionHistoryInfoComponent } from './components/completed-appointments/appointment-prescription-history-info/appointment-prescription-history-info.component';
import { ProviderInsuranceInNetComponent } from './components/provider-insurance-in-net/provider-insurance-in-net.component';
import { EditProviderInsuranceInNetComponent } from './components/provider-insurance-in-net/edit-provider-insurance-in-net/edit-provider-insurance-in-net.component';
import { ManagementPatientPaymentHistoryComponent } from './components/management-patient-payment-history/management-patient-payment-history.component';
import { RainfoPersonalInfoComponent } from './components/requested-appointments/request-appointment-info/rainfo-personal-info/rainfo-personal-info.component';
import { RaiApptHistoryInfoComponent } from './components/requested-appointments/request-appointment-info/rai-appt-history-info/rai-appt-history-info.component';
import { RaiExHistoryComponent } from './components/requested-appointments/request-appointment-info/rai-ex-history/rai-ex-history.component';
import { RaiMedicalDocumentInfoComponent } from './components/requested-appointments/request-appointment-info/rai-medical-document-info/rai-medical-document-info.component';
import { RaiCreditCardInsuranceInfoComponent } from './components/requested-appointments/request-appointment-info/rai-credit-card-insurance-info/rai-credit-card-insurance-info.component';
import { MedicalDocumentComponent } from './components/requested-appointments/request-appointment-info/medical-document/medical-document.component';
import { PatientChildrenViewComponent } from './components/patient-detail-view/patient-children-view/patient-children-view.component';
import { VaccineAppointmentComponent } from './components/vaccine-appointment/vaccine-appointment.component';
import { ManageVaccineApptSlotComponent } from './components/manage-vaccine-appt-slot/manage-vaccine-appt-slot.component';
import { RescheduleVaccineApptModalComponent } from './components/reschedule-vaccine-appt-modal/reschedule-vaccine-appt-modal.component';
import { VaccineAppointmentDetailComponent } from './components/vaccine-appointment/vaccine-appointment-detail/vaccine-appointment-detail.component';
import { WriteReferralComponent } from './components/requested-appointments/write-referral/write-referral.component';
import { GroupApptComponent } from './components/group-appt/group-appt.component';
import { GroupApptItemComponent } from './components/group-appt/group-appt-item/group-appt-item.component';
import { GroupApptDetailsComponent } from './components/group-appt/group-appt-details/group-appt-details.component';
import { GroupApptScheduledComponent } from './components/group-appt/group-appt-scheduled/group-appt-scheduled.component';
import { GroupApptCompletedComponent } from './components/group-appt/group-appt-completed/group-appt-completed.component';
import { GroupApptDocumentsComponent } from './components/group-appt/group-appt-documents/group-appt-documents.component';
import { GroupApptInviteUserComponent } from './components/group-appt/group-appt-invite-user/group-appt-invite-user.component';
import { ViewReviewsComponent } from './components/view-reviews/view-reviews.component';
import { ViewDeliverStatusModalComponent } from './components/sms-history/outgoing-sms/view-deliver-status-modal/view-deliver-status-modal.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AdminTicketDetailComponent } from './components/admin-ticket-detail/admin-ticket-detail.component';
import { GenerateExcelReportComponent } from './components/generate-excel-report/generate-excel-report.component';
import { ProviderAppointmentSlotComponent } from './components/provider-appointment-slot/provider-appointment-slot.component';
import { ProviderViewCalendarComponent } from './components/provider-view-calendar/provider-view-calendar.component';
import { TicketTableComponent } from './components/tickets/ticket-table/ticket-table.component';
import { PatientRequestComponent } from './components/patient-request/patient-request.component';
import { PatientRequestTableComponent } from './components/patient-request/patient-request-table/patient-request-table.component';
import { PatientRequestModalComponent } from './components/patient-request/patient-request-modal/patient-request-modal.component';
import { PrizmInfoComponent } from './components/requested-appointments/prizm-info/prizm-info.component';
import { AddPatientModalComponent } from './components/management-patients/add-patient-modal/add-patient-modal.component';
import { PrizmPatientNoteComponent } from './components/completed-appointments/prizm-patient-note/prizm-patient-note.component';
import { PrizmSendNoteModalComponent } from './components/completed-appointments/prizm-patient-note/prizm-send-note-modal/prizm-send-note-modal.component';
import { PrizmPatientPrescriptionComponent } from './components/completed-appointments/prizm-patient-note/prizm-patient-prescription/prizm-patient-prescription.component';
import { PrizmSendPrescriptionModalComponent } from './components/completed-appointments/prizm-patient-note/prizm-send-prescription-modal/prizm-send-prescription-modal.component';
import { ManagementPverifyPayerListComponent } from './components/management-pverify-payer-list/management-pverify-payer-list.component';
import { AddPverifyPayerListModalComponent } from './components/management-pverify-payer-list/add-pverify-payer-list-modal/add-pverify-payer-list-modal.component';
import { CombineExistingAcctModalComponent } from './components/completed-appointments/combine-existing-acct-modal/combine-existing-acct-modal.component';
@NgModule({
      imports: [
            CommonModule,
            SharedModule,
            mainRoutes,
            FormsModule,
            CustomFormsModule,
            TextMaskModule,
            ModalModule.forRoot(),
            NgxPaginationModule,
            ArchwizardModule,
            PdfViewerModule,
            HomeModule,
            NgIdleKeepaliveModule.forRoot(),
            NgxSortableModule,
            NgSelect2Module,
            CKEditorModule,
            SignaturePadModule
      ],
      declarations: [
            LayoutComponent,
            SideBarComponent,
            DashboardComponent,
            HeaderComponent,
            FooterComponent,

            CompanyComponent,
            CompanyInfoComponent,
            MyProfileComponent,
            EditMyProfileComponent,
            RequestedAppointmentsComponent,
            CompletedAppointmentsComponent,
            PaymentAppointmentInfoComponent,
            GenerateAndFaxComponent,
            AppointmentDocumentComponent,
            FaxNotificationViewComponent,
            AppointmentHistoryInfoComponent,
            PatientProfileViewComponent,
            ManagementPatientsComponent,
            AppointmentInfoComponent,
            FaxDocumentCompanyComponent,
            DocumentViewerComponent,
            AddNoteComponent,
            PreviewPdfComponent,
            RefundPaymentComponent,
            PatientDetailViewComponent,
            CompanySettingComponent,
            RequestAppointmentDetailComponent,
            CompletedAppointmentDetailComponent,
            VideoCallRequestComponent,
            ManageStaffsComponent,
            EditStaffProfileComponent,
            OpenTokProviderCallComponent,
            AppointmentAuditComponent,
            AppointmentReasonChartComponent,
            AddStaffProfileComponent,
            ChangeProviderComponent,
            AppointmentReasonComponent,
            AppointmentReasonInfoComponent,
            ManageAppointmentSlotComponent,
            MyAppointmentSlotComponent,
            RequestAppointmentInfoComponent,
            AddNoteInfoComponent,
            AddIcdModalComponent,
            ChargePaymentModalComponent,
            FutureAppointmentComponent,
            ParticipantInfoComponent,
            WriteWorkReleaseComponent,
            CkeditorClassicComponent,
            SignaturePatientComponent,
            PaymentHistoryInfoComponent,
            HealthDataPatientComponent,
            InviteGuestToVideoComponent,
            AppointmentClincialNoteComponent,
            AppointmentPaymentComponent,
            ProviderTaskListComponent,
            ProviderTaskToDoComponent,
            ProviderTaskCompletedComponent,
            ProviderTaskInfoComponent,
            HealthDataCardComponent,
            SmsHistoryComponent,
            IncomingSmsComponent,
            OutgoingSmsComponent,
            CancelReasonModalComponent,
            RestrictedPatientLogComponent,
            TaskListPatientComponent,
            PatientDetailInfoTabComponent,
            PatientAppointmentHistoryInfoTabComponent,
            PatientTaskListTabComponent,
            WriteLabOrderComponent,
            SignatureProviderComponent,
            WriteLabOrderPreviewComponent,
            WarningVerifiedComponent,
            ProviderGroupComponent,
            EditProviderGroupComponent,
            ProviderGroupAssignmentElementComponent,
            ProviderPersonalInfoComponent,
            ProviderAddressComponent,
            ProviderMedicalProfileComponent,
            ProviderServicesComponent,
            EditProviderServiceComponent,
            CaptureFundsModalComponent,
            ApptStatusHistoriesComponent,
            AddressInfoTabComponent,
            PersonalInfoTabComponent,
            EmergencyContactTabComponent,
            MedicalDocumentsTabComponent,
            AllergiesTabComponent,
            MedicalConditionsTabComponent,
            MedicationsTabComponent,
            ProviderStorageComponent,
            InsuranceBalanceBillingsComponent,
            InsuranceBalanceBillingModalComponent,
            ProviderLicensesComponent,
            ProviderLicenseInfoComponent,
            ProviderLicensesServicesComponent,
            LoginHistoryTabComponent,
            StaffLoginHistoryComponent,
            PageViewHistoryTabComponent,
            SeachDosePharmacyComponent,
            InsuranceBalanceBillingViewerComponent,
            AppointmentPrescriptionHistoryInfoComponent,
            ProviderInsuranceInNetComponent,
            EditProviderInsuranceInNetComponent,
            ManagementPatientPaymentHistoryComponent,
            RainfoPersonalInfoComponent,
            RaiApptHistoryInfoComponent,
            RaiExHistoryComponent,
            RaiMedicalDocumentInfoComponent,
            RaiCreditCardInsuranceInfoComponent,
            MedicalDocumentComponent,
            PatientChildrenViewComponent,
            VaccineAppointmentComponent,
            ManageVaccineApptSlotComponent,
            RescheduleVaccineApptModalComponent,
            VaccineAppointmentDetailComponent,
            WriteReferralComponent,
            GroupApptComponent,
            GroupApptItemComponent,
            GroupApptDetailsComponent,
            GroupApptScheduledComponent,
            GroupApptCompletedComponent,
            GroupApptDocumentsComponent,
            GroupApptInviteUserComponent,
            ViewReviewsComponent,
            ViewDeliverStatusModalComponent,
            TicketsComponent,
            AdminTicketDetailComponent,
            GenerateExcelReportComponent,
            ProviderAppointmentSlotComponent,
            ProviderViewCalendarComponent,
            TicketTableComponent,
            PatientRequestComponent,
            PatientRequestTableComponent,
            PatientRequestModalComponent,
            PrizmInfoComponent,
            AddPatientModalComponent,
            PrizmPatientNoteComponent,
            PrizmSendNoteModalComponent,
            PrizmPatientPrescriptionComponent,
            PrizmSendPrescriptionModalComponent,
            ManagementPverifyPayerListComponent,
            AddPverifyPayerListModalComponent,
            CombineExistingAcctModalComponent
      ],
      providers: [
            {
                  provide: HTTP_INTERCEPTORS,
                  useClass: TokenInterceptor,
                  multi: true
            }
      ]
})
export class MainModule {

}
