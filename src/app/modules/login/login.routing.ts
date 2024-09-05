import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { PatientSignInComponent } from './components/patient-sign-in/patient-sign-in.component';
import { ProviderSignInComponent } from './components/provider-sign-in/provider-sign-in.component';
import { PatientSignUpComponent } from './components/patient-sign-up/patient-sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { PatientFinishedRegistrationComponent } from './components/patient-finished-registration/patient-finished-registration.component';
import { AuthGuard } from '../common/guard/guard';
import { SmsVerificationComponent } from './components/sms-verification/sms-verification.component';
import { ProviderSignUpComponent } from './components/provider-sign-up/provider-sign-up.component';
import { ProviderSmsVerifyComponent } from './components/provider-sms-verify/provider-sms-verify.component';
import { ProviderFinishSignUpComponent } from './components/provider-finish-sign-up/provider-finish-sign-up.component';
const loginrouting: Routes = [
    { path: '', redirectTo: 'patient-sign-in', pathMatch: 'full' },
    {
        path: 'sms-verify',
        component: SmsVerificationComponent,
        canActivate: [AuthGuard],
        data: { pageName: 'SMS-Verification' }
    },
    {
        path: 'finished-registration',
        component: PatientFinishedRegistrationComponent,
        canActivate: [AuthGuard],
        data: { pageName: 'Patient-Sign-Up-2' }
    },
    { path: 'patient-sign-in', component: PatientSignInComponent },
    { path: 'patient-sign-up', component: PatientSignUpComponent },
    { path: 'provider-sign-in', component: ProviderSignInComponent },
    { path: 'provider-sign-up', component: ProviderSignUpComponent },
    {
        path: 'provider-sms-verify', component: ProviderSmsVerifyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'provider-finished-registration', component: ProviderFinishSignUpComponent,
        canActivate: [AuthGuard]
    },

    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    {
        path: 'confirm-email/:id', component: ConfirmEmailComponent
    },
    {
        path: 'verify-account', component: VerifyAccountComponent
    },
    { path: '**', redirectTo: 'patient-sign-in', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(loginrouting)],
    exports: [RouterModule]
})
export class loginRoutes { }