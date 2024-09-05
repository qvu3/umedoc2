import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiCreditCardInsuranceInfoComponent } from './rai-credit-card-insurance-info.component';

describe('RaiCreditCardInsuranceInfoComponent', () => {
  let component: RaiCreditCardInsuranceInfoComponent;
  let fixture: ComponentFixture<RaiCreditCardInsuranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiCreditCardInsuranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiCreditCardInsuranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
