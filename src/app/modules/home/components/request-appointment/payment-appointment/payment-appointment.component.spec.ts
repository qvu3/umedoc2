import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAppointmentComponent } from './payment-appointment.component';

describe('PaymentAppointmentComponent', () => {
  let component: PaymentAppointmentComponent;
  let fixture: ComponentFixture<PaymentAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
