import { PatientTicketDetailComponent } from './components/patient-ticket-detail/patient-ticket-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RequestAppointmentComponent } from './components/request-appointment/request-appointment.component';
import { AppointmentConfirmationComponent } from './components/appointment-confirmation/appointment-confirmation.component';
import { EditPatientProfilePageComponent } from './components/edit-patient-profile-page/edit-patient-profile-page.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { AuthGuard } from '../common/guard/guard';
import { RoleConstants } from 'src/app/Global';
import { AppointmentFeedbackComponent } from './components/appointment-feedback/appointment-feedback.component';
import { StripePaymentComponent } from '../common/component/stripe-payment/stripe-payment.component';
import { CanDeactiveRequest } from '../common/guard/can-deactive.request';
import { PatientProfileNewComponent } from './components/patient-profile-new/patient-profile-new.component';
import { PatientPrescriptionNewComponent } from './components/patient-profile-new/patient-prescription/patient-prescription.component';
import { PatientHistoryAppointmentNewComponent } from './components/patient-profile-new/patient-history-appointment/patient-history-appointment.component';
import { CreditCardNewComponent } from './components/patient-profile-new/credit-card-new/credit-card-new.component';
import { PatientPreferPharmacyComponent } from './components/patient-profile-new/patient-prefer-pharmacy/patient-prefer-pharmacy.component';
import { PatientMyProfileComponent } from './components/patient-profile-new/patient-my-profile/patient-my-profile.component';
import { PatientInsuranceComponent } from './components/patient-profile-new/patient-insurance/patient-insurance.component';
import { StorageContainerComponent } from './components/patient-profile-new/storage-container/storage-container.component';
import { WaitingRoomForGuestComponent } from './components/waiting-room-for-guest/waiting-room-for-guest.component';
import { InsuranceBalanceBillingComponent } from './components/insurance-balance-billing/insurance-balance-billing.component';
import { InsBalanceBillingsComponent } from './components/patient-profile-new/ins-balance-billings/ins-balance-billings.component';
import { PatientMessageComponent } from './components/patient-message/patient-message.component';
import { EmptyChatComponent } from '../app-chat/empty-chat/empty-chat.component';
import { MainChatComponent } from '../app-chat/main-chat/main-chat.component';
import { PatientChildrenComponent } from './components/patient-children/patient-children.component';
import { VaccineScheduleStepOneComponent } from './components/vaccine-schedule-step-one/vaccine-schedule-step-one.component';
import { VaccineScheduleStepTwoComponent } from './components/vaccine-schedule-step-two/vaccine-schedule-step-two.component';
import { ConfirmVaccineScheduleAppointmentComponent } from './components/confirm-vaccine-schedule-appointment/confirm-vaccine-schedule-appointment.component';
import { CancelPayWithCryptoComponent } from './components/cancel-pay-with-crypto/cancel-pay-with-crypto.component';
import { CompletedPayWithCryptoComponent } from './components/completed-pay-with-crypto/completed-pay-with-crypto.component';
import { GroupApptWaitingRoomComponent } from './components/group-appt-waiting-room/group-appt-waiting-room.component';
import { ApptReviewComponent } from './components/appt-review/appt-review.component';
import { PatientTicketsComponent } from './components/patient-tickets/patient-tickets.component';
const homerouting: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'patient-tickets', component: PatientTicketsComponent, canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Umecare', pageName: 'Patient Ticket' },
    },
    {
        path: 'patient-ticket-detail/:id', component: PatientTicketDetailComponent, canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Umecare', pageName: 'Patient Ticket Detail' },
    },
    {
        path: 'cancel-pay-with-crypto/:id', component: CancelPayWithCryptoComponent, canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Cancel Payment Crypto', pageName: 'Cancel Payment Crypto' },
    },
    {
        path: 'completed-pay-with-crypto/:id', component: CompletedPayWithCryptoComponent, canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Complete Payment Crypto', pageName: 'Completed Payment Crypto' },
    },
    {
        path: 'patient-messages', component: PatientMessageComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Chat With Support' },
        children: [
            { path: '', redirectTo: 'patient-empty', pathMatch: 'full' },
            {
                path: 'patient-empty', component: EmptyChatComponent,
                data: { pageName: 'Chat-Waiting' }
            },
            {
                path: 'patient-main/:roomId', component: MainChatComponent,
                data: { pageName: 'Chat-With-Provider' }
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
    },
    {
        path: 'patient-profile', component: PatientProfileNewComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Dashboard', pageName: 'Dashboard' }
    },
    {
        path: 'patient-prescription', component: PatientPrescriptionNewComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Prescription History', pageName: 'Patient-Prescription-History' }
    },
    {
        path: 'patient-children', component: PatientChildrenComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Children', pageName: 'Patient-Children' }
    },
    {
        path: 'patient-history', component: PatientHistoryAppointmentNewComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Appointment History', pageName: 'Patient-Appointment-History' }
    },
    {
        path: 'patient-credit-card', component: CreditCardNewComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Payment', pageName: 'Patient-EditPayment' }
    },
    {
        path: 'patient-prefer-pharmacy', component: PatientPreferPharmacyComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Preferred Pharmacy', pageName: 'Patient-Preferred-Pharmacy' }
    },
    {
        path: 'patient-my-profile', component: PatientMyProfileComponent,
        canActivate: [AuthGuard],

        data: { Roles: [RoleConstants.Patient], title: 'My Profile', pageName: 'Patient-My-Profile' }
    },
    {
        path: 'patient-insurance', component: PatientInsuranceComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Insurance', pageName: 'Patient-Insurance' }
    },
    {
        path: 'patient-storage', component: StorageContainerComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Medical Documents', pageName: 'Patient-Medical-Documents' }
    },
    {
        path: 'billings', component: InsBalanceBillingsComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], title: 'Insurance Balance Billing', pageName: 'Patient-Insurance-Balance-Billing' }
    },
    {
        path: 'stripe-payment', component: StripePaymentComponent,
    },
    {
        path: 'edit-patient-profile', component: EditPatientProfilePageComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Edit-Profile' }
    },
    {
        path: 'request-appointment', component: RequestAppointmentComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactiveRequest],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Request-Appointment' }
    },
    {
        path: 'vaccine-appt-schedule', component: VaccineScheduleStepOneComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Vaccine-Appointment-Step-One' }
    },
    {
        path: 'vaccine-appt-schedule-2', component: VaccineScheduleStepTwoComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Vaccine-Appointment-Step-Two' }
    },
    {
        path: 'vaccine-schedule-appointment-confirmation/:id', component: ConfirmVaccineScheduleAppointmentComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], pageName: 'Vaccine-Appointment-Confirmation' }
    },
    {
        path: 'appointment-confirmation/:{id}', component: AppointmentConfirmationComponent,
        canActivate: [AuthGuard],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Appointment-Confirmation' }
    },
    {
        path: 'appointment-feedback', component: AppointmentFeedbackComponent,
        data: { pageName: 'Patient-Appointment-Feedback' }
    },
    {
        path: 'appointment-room/:{id}', component: WaitingRoomComponent,
        canActivate: [AuthGuard], 
        canDeactivate: [CanDeactiveRequest],
        data: { Roles: [RoleConstants.Patient], pageName: 'Patient-Appointment-Room' }
    },
    {
        path: 'waiting-room-for-guest/:{id}', component: WaitingRoomForGuestComponent,
    },
    {
        path: 'insurance-balance-billing/:{id}', component: InsuranceBalanceBillingComponent,

    },{
         path: 'group-appt-waiting-room/:{id}', component: GroupApptWaitingRoomComponent, 
        canActivate: [AuthGuard], 
        canDeactivate: [CanDeactiveRequest],
        data: { Roles: [RoleConstants.Patient], pageName: 'Group-Appt-Patient-Appointment-Room' }
    },
    {
        path: 'appt-review/:{id}', component: ApptReviewComponent, 
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(homerouting)],
    exports: [RouterModule]
})
export class homeRoutes { }