import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../common/common.module';
import { homeRoutes } from './home-routing';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalModule } from "ngx-bootstrap";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientHistoryAppointmentComponent } from './components/patient-profile/patient-history-appointment/patient-history-appointment.component';
import { PreCheckComponent } from './components/request-appointment/pre-check/pre-check.component';
import { RequestAppointmentComponent } from './components/request-appointment/request-appointment.component';
import { PerferPharmacySearchComponent } from './components/perfer-pharmacy-search/perfer-pharmacy-search.component';
import { AppointmentWizardComponent } from './components/request-appointment/appointment-wizard/appointment-wizard.component';
import { AvailableProviderComponent } from './components/request-appointment/available-provider/available-provider.component';
import { PaymentAppointmentComponent } from './components/request-appointment/payment-appointment/payment-appointment.component';
import { AppointmentConfirmationComponent } from './components/appointment-confirmation/appointment-confirmation.component';
import { ArchwizardModule } from 'angular-archwizard';
import { EditPatientProfilePageComponent } from './components/edit-patient-profile-page/edit-patient-profile-page.component';
import { EditPatientProfileComponent } from './components/request-appointment/edit-patient-profile/edit-patient-profile.component';
import { ProviderProfileComponent } from './components/request-appointment/provider-profile/provider-profile.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { DeviceCheckComponent } from './components/request-appointment/device-check/device-check.component';
import { AppointmentFeedbackComponent } from './components/appointment-feedback/appointment-feedback.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/services/token.interceptor';
import { SelectProviderComponent } from './components/request-appointment/available-provider/select-provider/select-provider.component';
import { PatientProfileRequestAppointmentComponent } from './components/request-appointment/patient-profile-request-appointment/patient-profile-request-appointment.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { NgSelect2Module } from 'ng-select2';
import { NgImageSliderModule } from 'ng-image-slider';
import { PatientPrescriptionComponent } from './components/patient-profile/patient-prescription/patient-prescription.component';
import { InsuranceUpdateComponent } from './components/insurance-update/insurance-update.component';
import { PatientProfileNewComponent } from './components/patient-profile-new/patient-profile-new.component';
import { PatientPrescriptionNewComponent } from './components/patient-profile-new/patient-prescription/patient-prescription.component';
import { PatientHistoryAppointmentNewComponent } from './components/patient-profile-new/patient-history-appointment/patient-history-appointment.component';
import { CreditCardNewComponent } from './components/patient-profile-new/credit-card-new/credit-card-new.component';
import { PatientPreferPharmacyComponent } from './components/patient-profile-new/patient-prefer-pharmacy/patient-prefer-pharmacy.component';
import { PatientMyProfileComponent } from './components/patient-profile-new/patient-my-profile/patient-my-profile.component';
import { PatientInsuranceComponent } from './components/patient-profile-new/patient-insurance/patient-insurance.component';
import { RescheduleModalComponent } from './components/reschedule-modal/reschedule-modal.component';
import { PatientStorageComponent } from './components/patient-profile-new/patient-storage/patient-storage.component';
import { StorageContainerComponent } from './components/patient-profile-new/storage-container/storage-container.component';
import { ShareLinkModalComponent } from './components/patient-profile-new/patient-storage/share-link-modal/share-link-modal.component';
import { WaitingRoomForGuestComponent } from './components/waiting-room-for-guest/waiting-room-for-guest.component';
import { PatientPaymentHistoryInfoComponent } from './components/patient-profile-new/patient-payment-history-info/patient-payment-history-info.component';
import { InsuranceBalanceBillingComponent } from './components/insurance-balance-billing/insurance-balance-billing.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InsBalanceBillingsComponent } from './components/patient-profile-new/ins-balance-billings/ins-balance-billings.component';
import { PatientCancelAppointmentModalComponent } from './components/patient-cancel-appointment-modal/patient-cancel-appointment-modal.component';
import { PatientMessageComponent } from './components/patient-message/patient-message.component';
import { AppChatModule } from '../app-chat/app-chat.module';
import { LoginHistoryComponent } from './components/patient-profile-new/login-history/login-history.component';
import { PatientInviteModalComponent } from './components/patient-profile-new/patient-invite-modal/patient-invite-modal.component';
import { PatientChildrenComponent } from './components/patient-children/patient-children.component';
import { VaccineScheduleStepOneComponent } from './components/vaccine-schedule-step-one/vaccine-schedule-step-one.component';
import { VaccineScheduleStepTwoComponent } from './components/vaccine-schedule-step-two/vaccine-schedule-step-two.component';
import { ConfirmVaccineScheduleAppointmentComponent } from './components/confirm-vaccine-schedule-appointment/confirm-vaccine-schedule-appointment.component';
import { CancelPayWithCryptoComponent } from './components/cancel-pay-with-crypto/cancel-pay-with-crypto.component';
import { CompletedPayWithCryptoComponent } from './components/completed-pay-with-crypto/completed-pay-with-crypto.component';
import { GroupApptWaitingRoomComponent } from './components/group-appt-waiting-room/group-appt-waiting-room.component';
import { ApptReviewComponent } from './components/appt-review/appt-review.component';
import { PatientHistoryGroupSessionComponent } from './components/patient-profile/patient-history-group-session/patient-history-group-session.component';
import { RatingModule } from 'ngx-rating';
import { GroupApptDocumentViewsComponent } from './components/patient-profile/patient-history-group-session/group-appt-document-views/group-appt-document-views.component';
import { BillingPlanComponent } from './components/patient-profile-new/billing-plan/billing-plan.component';
import { PatientTicketsComponent } from './components/patient-tickets/patient-tickets.component';
import { PatientTicketDetailComponent } from './components/patient-ticket-detail/patient-ticket-detail.component'
@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PatientProfileComponent,
    PatientHistoryAppointmentComponent,
    PreCheckComponent,
    RequestAppointmentComponent,
    PerferPharmacySearchComponent,
    AppointmentWizardComponent,
    AvailableProviderComponent,
    PaymentAppointmentComponent,
    AppointmentConfirmationComponent,
    EditPatientProfilePageComponent,
    EditPatientProfileComponent,
    ProviderProfileComponent,
    WaitingRoomComponent,
    DeviceCheckComponent,
    AppointmentFeedbackComponent,
    SelectProviderComponent,
    PatientProfileRequestAppointmentComponent,
    CardInfoComponent,
    PatientPrescriptionComponent,
    PatientPrescriptionNewComponent,
    InsuranceUpdateComponent,
    PatientProfileNewComponent,
    PatientHistoryAppointmentNewComponent,
    CreditCardNewComponent,
    PatientPreferPharmacyComponent,
    PatientMyProfileComponent,
    PatientInsuranceComponent,
    RescheduleModalComponent,
    PatientStorageComponent,
    StorageContainerComponent,
    ShareLinkModalComponent,
    WaitingRoomForGuestComponent,
    PatientPaymentHistoryInfoComponent,
    InsuranceBalanceBillingComponent,
    InsBalanceBillingsComponent,
    PatientCancelAppointmentModalComponent,
    PatientMessageComponent,
    LoginHistoryComponent,
    PatientInviteModalComponent,
    PatientChildrenComponent,
    VaccineScheduleStepOneComponent,
    VaccineScheduleStepTwoComponent,
    ConfirmVaccineScheduleAppointmentComponent,
    CancelPayWithCryptoComponent,
    CompletedPayWithCryptoComponent,
    GroupApptWaitingRoomComponent,
    ApptReviewComponent,
    PatientHistoryGroupSessionComponent,
    GroupApptDocumentViewsComponent,
    BillingPlanComponent,
    PatientTicketsComponent,
    PatientTicketDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    SharedModule,
    homeRoutes,
    ArchwizardModule,
    TextMaskModule,
    ModalModule.forRoot(),
    NgSelect2Module,
    NgImageSliderModule,
    PdfViewerModule,
    AppChatModule,
    RatingModule

  ],
  exports: [
    EditPatientProfileComponent,
    PatientHistoryAppointmentComponent,
    PatientPrescriptionComponent,
    InsuranceUpdateComponent,
    PerferPharmacySearchComponent,
    RescheduleModalComponent,
    PatientStorageComponent,
    ProviderProfileComponent,
    CardInfoComponent,
    PatientInsuranceComponent,
    CreditCardNewComponent,
    PatientPreferPharmacyComponent,
    ShareLinkModalComponent,
    PatientPrescriptionNewComponent,
    LoginHistoryComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class HomeModule { }
