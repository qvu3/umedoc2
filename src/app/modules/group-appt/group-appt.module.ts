import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupApptRoutingModule } from './group-appt-routing.module';
import { BookApptComponent } from './components/book-appt/book-appt.component';
import { StepPaymentApptComponent } from './components/book-appt/step-payment-appt/step-payment-appt.component';
import { StepGroupSessionComponent } from './components/book-appt/step-group-session/step-group-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common/common.module';
import { HomeModule } from '../home/home.module';
import { StepApptInsuranceComponent } from './components/book-appt/step-appt-insurance/step-appt-insurance.component';


@NgModule({
  declarations: [BookApptComponent,
    StepPaymentApptComponent,
    StepGroupSessionComponent,
    StepApptInsuranceComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    GroupApptRoutingModule
  ]
})
export class GroupApptModule { }
