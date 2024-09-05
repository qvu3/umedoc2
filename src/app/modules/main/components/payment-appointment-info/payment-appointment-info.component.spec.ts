import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAppointmentInfoComponent } from './payment-appointment-info.component';

describe('PaymentAppointmentInfoComponent', () => {
  let component: PaymentAppointmentInfoComponent;
  let fixture: ComponentFixture<PaymentAppointmentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAppointmentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAppointmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
