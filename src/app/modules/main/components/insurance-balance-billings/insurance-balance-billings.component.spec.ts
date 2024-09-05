import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBalanceBillingsComponent } from './insurance-balance-billings.component';

describe('InsuranceBalanceBillingsComponent', () => {
  let component: InsuranceBalanceBillingsComponent;
  let fixture: ComponentFixture<InsuranceBalanceBillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceBalanceBillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBalanceBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
