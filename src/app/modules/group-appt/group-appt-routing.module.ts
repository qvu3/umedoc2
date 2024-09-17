import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleConstants } from '../../Global';
import { CanDeactiveRequest } from '../common/guard/can-deactive.request';
import { AuthGuard } from '../common/guard/guard';
 import { BookApptComponent } from './components/book-appt/book-appt.component';
import { StepApptInsuranceComponent } from './components/book-appt/step-appt-insurance/step-appt-insurance.component';
import { StepGroupSessionComponent } from './components/book-appt/step-group-session/step-group-session.component';
import { StepPaymentApptComponent } from './components/book-appt/step-payment-appt/step-payment-appt.component';


const routes: Routes = [{
  path: '', component: BookApptComponent,
  canActivate: [AuthGuard],
  data: { Roles: [RoleConstants.Patient] },
  children: [
     { path: '', redirectTo: 'appt-group-insurance', pathMatch: 'full' },
    { path: 'appt-group-insurance', component: StepApptInsuranceComponent, data: { pageName: 'Appt-Group-Insurance' } },
    { path: 'appt-group-session', component: StepGroupSessionComponent, data: { pageName: 'Appt-Group-Session' } },
    { path: 'appt-payment', component: StepPaymentApptComponent, data: { pageName: 'Group-Appt-Payment' } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupApptRoutingModule {

}
