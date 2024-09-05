import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBalanceBillingComponent } from './insurance-balance-billing.component';

describe('InsuranceBalanceBillingComponent', () => {
  let component: InsuranceBalanceBillingComponent;
  let fixture: ComponentFixture<InsuranceBalanceBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceBalanceBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBalanceBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
