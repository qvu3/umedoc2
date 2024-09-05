import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../common/common.module';
import { PatientRoutingModule } from './patient.routing.module';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { StepChooseProviderComponent } from './components/book-appointment/step-choose-provider/step-choose-provider.component';
import { StepInsuranceComponent } from './components/book-appointment/step-insurance/step-insurance.component';
import { StepPaymentComponent } from './components/book-appointment/step-payment/step-payment.component';
import { StepReasonComponent } from './components/book-appointment/step-reason/step-reason.component';
import { HomeModule } from '../home/home.module';
import { InsuranceInfoComponent } from './components/insurance-info/insurance-info.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { StepChoosePatientComponent } from './components/book-appointment/step-choose-patient/step-choose-patient.component';
import { StepCountriesComponent } from './components/book-appointment/step-countries/step-countries.component'; 
import { NgSelect2Module } from 'ng-select2';
import { WeightLossReasonComponent } from './components/book-appointment/weight-loss-reason/weight-loss-reason.component';
 
@NgModule({
  declarations: [
    LayoutComponent,
    BookAppointmentComponent,
    StepChooseProviderComponent,
    StepInsuranceComponent,
    StepPaymentComponent,
    StepReasonComponent,
    InsuranceInfoComponent,
    StepChoosePatientComponent,
    StepCountriesComponent,
    WeightLossReasonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    PatientRoutingModule,
    FormsModule,
    CustomFormsModule, 
    NgImageSliderModule,
    NgSelect2Module,
  ]
})
export class PatientModule { }
