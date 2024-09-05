import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPaymentApptComponent } from './step-payment-appt.component';

describe('StepPaymentApptComponent', () => {
  let component: StepPaymentApptComponent;
  let fixture: ComponentFixture<StepPaymentApptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepPaymentApptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPaymentApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
