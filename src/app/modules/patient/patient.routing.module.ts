import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleConstants } from 'src/app/Global';
import { CanDeactiveRequest } from '../common/guard/can-deactive.request';
import { AuthGuard } from '../common/guard/guard';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { StepChoosePatientComponent } from './components/book-appointment/step-choose-patient/step-choose-patient.component';
import { StepChooseProviderComponent } from './components/book-appointment/step-choose-provider/step-choose-provider.component';
import { StepCountriesComponent } from './components/book-appointment/step-countries/step-countries.component';
import { StepInsuranceComponent } from './components/book-appointment/step-insurance/step-insurance.component';
import { StepPaymentComponent } from './components/book-appointment/step-payment/step-payment.component';
import { StepReasonComponent } from './components/book-appointment/step-reason/step-reason.component';

const routes: Routes = [
  {
    path: 'request-appointment/:category', component: BookAppointmentComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactiveRequest],
    data: { Roles: [RoleConstants.Patient] },
    children: [
      { path: '', redirectTo: 'reasons', pathMatch: 'full' }, 
      { path: 'reasons', component: StepReasonComponent, data: { pageName: 'Request-Appt-AddReason' } },
      { path: 'choose-countries', component: StepCountriesComponent, data: { pageName: 'Request-Appt-Choos-Countries' } },
      { path: 'travel-medicine', component: StepReasonComponent, data: { pageName: 'Request-Appt-TravelMedial' } },
      { path: 'choose-provider', component: StepChooseProviderComponent, data: { pageName: 'Request-Appt-ChooseProvider' } },
      { path: 'insurances', component: StepInsuranceComponent , data: { pageName: 'Request-Appt-AddInsurances' }},
      { path: 'payment', component: StepPaymentComponent , data: { pageName: 'Request-Appt-Payment' }},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }