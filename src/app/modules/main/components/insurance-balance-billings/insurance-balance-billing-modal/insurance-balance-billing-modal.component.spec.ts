import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBalanceBillingModalComponent } from './insurance-balance-billing-modal.component';

describe('InsuranceBalanceBillingModalComponent', () => {
  let component: InsuranceBalanceBillingModalComponent;
  let fixture: ComponentFixture<InsuranceBalanceBillingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceBalanceBillingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBalanceBillingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
