import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../common/common.module';
import { PatientSignInComponent } from './components/patient-sign-in/patient-sign-in.component';
import { PatientSignUpComponent } from './components/patient-sign-up/patient-sign-up.component';
import { ProviderSignInComponent } from './components/provider-sign-in/provider-sign-in.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../common/services/token.interceptor';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { PatientFinishedRegistrationComponent } from './components/patient-finished-registration/patient-finished-registration.component';
import { SmsVerificationComponent } from './components/sms-verification/sms-verification.component';
import { ResendSmsRegisterComponent } from './components/resend-sms-register/resend-sms-register.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProviderSignUpComponent } from './components/provider-sign-up/provider-sign-up.component';
import { JoyrideModule } from 'ngx-joyride';
import { ProviderSmsVerifyComponent } from './components/provider-sms-verify/provider-sms-verify.component';
import { ProviderFinishSignUpComponent } from './components/provider-finish-sign-up/provider-finish-sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JoyrideModule.forRoot(),
    CustomFormsModule,
    ModalModule,
    SharedModule,
    loginRoutes,
    TextMaskModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    PatientSignInComponent,
    PatientSignUpComponent,
    ProviderSignInComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ConfirmEmailComponent,
    VerifyAccountComponent,
    PatientFinishedRegistrationComponent,
    SmsVerificationComponent,
    ResendSmsRegisterComponent,
    ProviderSignUpComponent,
    ProviderSmsVerifyComponent,
    ProviderFinishSignUpComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class LoginModule {

}


