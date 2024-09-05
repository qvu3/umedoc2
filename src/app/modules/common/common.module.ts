import { PatientRequestService } from './services/patient-request.service';
import { TicketService } from './services/ticket.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guard/guard';
import { CommonDialogService } from './services/dialog.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { AuthenticationService } from './services/authentication.service';
import { PagingTableDirective } from './directive/paging-table.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { InitMenuDirective } from './directive/init-menu.directive';
import { CompanyService } from './services/company.service';
import { ColorPickerDirective } from './directive/color-picker.directive';
import { FileUploadDirective } from './directive/fileupload.directive';
import { GreateThanToDirective } from './directive/greate-than-to.directive';
import { EqualToControlDirective } from './directive/equal-to-control.directive';
import { ExistObjectDirective } from './directive/exist-object.directive';
import { CropImageComponent } from './component/crop-image/crop-image.component';
import { ActionCardButtonDirective } from './directive/action-card-button.directive';
import { ICheckDirective } from './directive/i-check.directive';
import { AppointmentDocumentService } from './services/appointment-document.service';
import { AppointmentImageService } from './services/appointment-image.service';
import { AppointmentNoteService } from './services/appointment-note.service';
import { AppointmentReasonService } from './services/appointment-reason.service';
import { AppointmentStatusService } from './services/appointment-status.service';
import { AppointmentService } from './services/appointment.service';
import { EmailNotificationService } from './services/email-notification.service';
import { EmailTemplateService } from './services/email-template.service';
import { PatientAllergyService } from './services/patient-allergy.service';
import { PatientMedicalConditionService } from './services/patient-medical-condition.service';
import { PatientMedicationService } from './services/patient-medication.service';
import { PatientProfileService } from './services/patient-profile.service';
import { ProviderDegreeService } from './services/provider-degree.service';
import { ProviderEducationService } from './services/provider-education.service';
import { ProviderProfileService } from './services/provider-profile.service';
import { ProviderRoleService } from './services/provider-role.service';
import { ProviderSpecialtyService } from './services/provider-specialty.service';
import { SMSNotificationService } from './services/sms-notification.service';
import { SRFaxDetailService } from './services/srfax-detail.service';
import { SRFaxNotificationService } from './services/srfax-notification.service';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';
import { CropImageViewComponent } from './component/crop-image-view/crop-image-view.component';
import { ViewMarkerComponent } from './component/view-marker/view-marker.component';
import { GeoGmapComponent } from './component/geo-gmap/geo-gmap.component';
import { GeoCodeDirective } from './directive/geo-code.directive';
import { AppointmentReasonAssignmentService } from './services/appointment-reason-assignment.service';
import { PaypalPaymentDirective } from './directive/paypal-payment.directive';
import { UtilityService } from './services/utility.service';
import { PrmcHub } from './services/prmc-hub';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ImgGalleryDirective } from './directive/img-gallery.directive';
import { SwitchBootDirective } from './directive/switch-boot.directive';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
// import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EncryptTextBoxComponent } from './component/encrypt-text-box/encrypt-text-box.component';
import { OpenTokComponent } from './component/open-tok/open-tok.component';
import { PublisherComponent } from './component/open-tok/publisher/publisher.component';
import { SubscriberComponent } from './component/open-tok/subcriber/subcriber.component';
import { AppointmentSlotService } from './services/appointment-slot.service';
import { StripePaymentComponent } from './component/stripe-payment/stripe-payment.component';
import { VideoCallFrameComponent } from './component/video-call-frame/video-call-frame.component';
import { SelectAllergyComponent } from './component/select-allergy/select-allergy.component';
// import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ScheduleProviderAppointmentComponent } from './component/schedule-provider-appointment/schedule-provider-appointment.component';
import { InitPatientMenuDirective } from './directive/init-patient-menu.directive';
import { PatientInsuranceService } from './services/patient-insurance.service';

import { PatientStorageService } from './services/patient-storage.service';
import { DocumentTemplateService } from './services/document-template.service';
import { TwillioCallClientDirective } from './directive/twillio-call-client.directive';
import { BrowserCallTwillioComponent } from './component/browser-call-twillio/browser-call-twillio.component';
import { GuestVideoCallFrameComponent } from './component/guest-video-call-frame/guest-video-call-frame.component';
import { ProviderTaskService } from './services/provider-task.service';
import { RestrictedPatientLogService } from './services/restricted-patient-log.service';
import { ProviderGroupService } from './services/provider-group.service';
import { DefaultImgPipe } from './directive/default-img.pipe';
import { DateTimeInlinePickerDirective } from './directive/date-time-inline-picker.directive';
import { StateNamePipe } from './directive/state-name.pipe';
import { ProviderStorageService } from './services/provider-storage.service';
import { ProviderLicenseService } from './services/provider-license.service';
import { AppChatComponent } from './component/app-chat/app-chat.component';
import { OrderBySentDatePipe } from './directive/order-by-sent-date.pipe';
import { InitAppChatDirective } from './directive/init-app-chat.directive';
import { LoginHistoryService } from './services/login-history.service';
import { ChatAvatarPipe } from './directive/chat-avatar.pipe';
import { ProviderBadgeService } from './services/provider-badge.service';
import { VideoCallHistoryService } from './services/video-call-history.service';
import { DeletePatientInsuranceService } from './services/delete-patient-insurance.service';
import { DefaultPicturePipe } from './directive/default-picture.pipe';
import { PverifyInsuranceModalComponent } from './component/pverify-insurance-modal/pverify-insurance-modal.component';
import { PverifyInsuranceListComponent } from './component/pverify-insurance-list/pverify-insurance-list.component';
import { PverifyDisableReasonComponent } from './component/pverify-disable-reason/pverify-disable-reason.component';
import { PverifyInsuranceSetFinalCopayComponent } from './component/pverify-insurance-set-final-copay/pverify-insurance-set-final-copay.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectLanguageComponent } from './component/select-language/select-language.component';
import { PverifyUploadImageComponent } from './component/pverify-upload-image/pverify-upload-image.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ChildItemComponent } from './component/child-item/child-item.component';
import { PatientChildModalComponent } from './component/patient-child-modal/patient-child-modal.component';
import { CountOldPipe } from './directive/count-old.directive';
import { SafeUrlPipe } from './directive/safe-url.directive';
import { SubmissionJfPatientComponent } from './component/submission-jf-patient/submission-jf-patient.component';
import { ChangeProviderBackupComponent } from './component/change-provider-backup/change-provider-backup.component';
import { CryptoInfoViewComponent } from './component/crypto-info-view/crypto-info-view.component';
import { GroupAppVideoCallComponent } from './component/group-app-video-call/group-app-video-call.component';
import { GroupApptDocumentsService } from './services/group-appt-documents.service';
import { PatientBlockedListModalComponent } from './component/patient-blocked-list-modal/patient-blocked-list-modal.component';
import { CdcCountryInfoComponent } from './component/cdc-country-info/cdc-country-info.component';
import { SubscriptionPlanService } from './services/subscription-plan.service';
import { PatientSubscriptionService } from './services/patient-subscription.service';
import { NewTicketModalComponent } from './component/new-ticket-modal/new-ticket-modal.component';
import { TicketDetailComponent } from './component/ticket-detail/ticket-detail.component';
import { ConfirmUmecarAgreementComponent } from './component/confirm-umecar-agreement/confirm-umecar-agreement.component';
import { AppointmentPrescriptionDocumentComponent } from './component/appointment-prescription-document/appointment-prescription-document.component';
import { GeneratePrescriptionPdfModalComponent } from './component/generate-prescription-pdf-modal/generate-prescription-pdf-modal.component';
import { LetterMedicationRefillComponent } from './component/letter-medication-refill/letter-medication-refill.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    DeviceDetectorService,
    ReactiveFormsModule,
    NgSelectModule,
    TextMaskModule,
    TranslateModule
  ],
  declarations: [
    PagingTableDirective,
    InitMenuDirective,
    FileUploadDirective,
    ColorPickerDirective,
    GreateThanToDirective,
    EqualToControlDirective,
    ExistObjectDirective,
    CropImageComponent,
    ActionCardButtonDirective,
    ICheckDirective,
    GeoCodeDirective,
    DateTimePickerComponent,
    CropImageViewComponent,
    ViewMarkerComponent,
    GeoGmapComponent,
    PaypalPaymentDirective,
    ImgGalleryDirective,
    SwitchBootDirective,
    ChangePasswordComponent,
    EncryptTextBoxComponent,
    OpenTokComponent,
    PublisherComponent,
    SubscriberComponent,
    StripePaymentComponent,
    VideoCallFrameComponent,
    SelectAllergyComponent,
    ScheduleProviderAppointmentComponent,
    InitPatientMenuDirective,
    TwillioCallClientDirective,
    BrowserCallTwillioComponent,
    GuestVideoCallFrameComponent,
    DefaultImgPipe,
    DateTimeInlinePickerDirective,
    StateNamePipe,
    AppChatComponent,
    OrderBySentDatePipe,
    InitAppChatDirective,
    ChatAvatarPipe,
    DefaultPicturePipe,
    PverifyInsuranceModalComponent,
    PverifyInsuranceListComponent,
    PverifyDisableReasonComponent,
    PverifyInsuranceSetFinalCopayComponent,
    SelectLanguageComponent,
    PverifyUploadImageComponent,
    ResetPasswordComponent,
    ChildItemComponent,
    PatientChildModalComponent,
    CountOldPipe,
    SafeUrlPipe,
    SubmissionJfPatientComponent,
    ChangeProviderBackupComponent,
    CryptoInfoViewComponent,
    GroupAppVideoCallComponent,
    PatientBlockedListModalComponent,
    CdcCountryInfoComponent,
    NewTicketModalComponent,
    TicketDetailComponent,
    ConfirmUmecarAgreementComponent,
    AppointmentPrescriptionDocumentComponent,
    GeneratePrescriptionPdfModalComponent,
    LetterMedicationRefillComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    PagingTableDirective,
    InitMenuDirective,
    FileUploadDirective,
    ColorPickerDirective,
    GreateThanToDirective,
    EqualToControlDirective,
    CropImageComponent,
    ActionCardButtonDirective,
    ICheckDirective,
    GeoCodeDirective,
    DateTimePickerComponent,
    CropImageViewComponent,
    ViewMarkerComponent,
    GeoGmapComponent,
    PaypalPaymentDirective,
    ImgGalleryDirective,
    SwitchBootDirective,
    ChangePasswordComponent,
    EncryptTextBoxComponent,
    OpenTokComponent,
    StripePaymentComponent,
    VideoCallFrameComponent,
    SelectAllergyComponent,
    ScheduleProviderAppointmentComponent,
    InitPatientMenuDirective,
    TwillioCallClientDirective,
    BrowserCallTwillioComponent,
    GuestVideoCallFrameComponent,
    DefaultImgPipe,
    DateTimeInlinePickerDirective,
    StateNamePipe,
    OrderBySentDatePipe,
    InitAppChatDirective,
    ChatAvatarPipe,
    DefaultPicturePipe,
    PverifyInsuranceModalComponent,
    PverifyInsuranceListComponent,
    SelectLanguageComponent,
    PverifyUploadImageComponent,
    ResetPasswordComponent,
    ChildItemComponent,
    PatientChildModalComponent,
    CountOldPipe,
    SafeUrlPipe,
    SubmissionJfPatientComponent,
    ChangeProviderBackupComponent,
    CryptoInfoViewComponent,
    GroupAppVideoCallComponent,
    PatientBlockedListModalComponent,
    CdcCountryInfoComponent,
    NewTicketModalComponent,
    TicketDetailComponent,
    ConfirmUmecarAgreementComponent,
    AppointmentPrescriptionDocumentComponent,
    GeneratePrescriptionPdfModalComponent,
    LetterMedicationRefillComponent
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthenticationService,
        AuthGuard,
        CommonDialogService,
        UserService,
        TokenService,
        CompanyService,
        AppointmentDocumentService,
        AppointmentImageService,
        AppointmentNoteService,
        AppointmentReasonService,
        AppointmentStatusService,
        AppointmentService,
        EmailNotificationService,
        EmailTemplateService,
        PatientAllergyService,
        PatientMedicalConditionService,
        PatientMedicationService,
        PatientProfileService,
        ProviderDegreeService,
        ProviderEducationService,
        ProviderProfileService,
        ProviderRoleService,
        ProviderSpecialtyService,
        SMSNotificationService,
        SRFaxDetailService,
        SRFaxNotificationService,
        AppointmentReasonAssignmentService,
        PrmcHub,
        UtilityService,
        AppointmentSlotService,
        PatientInsuranceService,
        PatientStorageService,
        DocumentTemplateService,
        ProviderTaskService,
        RestrictedPatientLogService,
        ProviderGroupService,
        ProviderStorageService,
        ProviderLicenseService,
        LoginHistoryService,
        ProviderBadgeService,
        VideoCallHistoryService,
        DeletePatientInsuranceService,
        GroupApptDocumentsService,
        SubscriptionPlanService,
        PatientSubscriptionService,
        TicketService,
        PatientRequestService
      ]
    };
  }
}
