import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPaymentHistoryInfoComponent } from './patient-payment-history-info.component';

describe('PatientPaymentHistoryInfoComponent', () => {
  let component: PatientPaymentHistoryInfoComponent;
  let fixture: ComponentFixture<PatientPaymentHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPaymentHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPaymentHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
