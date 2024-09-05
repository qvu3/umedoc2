import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPatientPaymentHistoryComponent } from './management-patient-payment-history.component';

describe('ManagementPatientPaymentHistoryComponent', () => {
  let component: ManagementPatientPaymentHistoryComponent;
  let fixture: ComponentFixture<ManagementPatientPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPatientPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPatientPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
