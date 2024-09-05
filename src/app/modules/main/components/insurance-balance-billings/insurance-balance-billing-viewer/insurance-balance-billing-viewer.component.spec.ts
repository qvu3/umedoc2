import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBalanceBillingViewerComponent } from './insurance-balance-billing-viewer.component';

describe('InsuranceBalanceBillingViewerComponent', () => {
  let component: InsuranceBalanceBillingViewerComponent;
  let fixture: ComponentFixture<InsuranceBalanceBillingViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceBalanceBillingViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBalanceBillingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
