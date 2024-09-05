import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PverifyInsuranceSetFinalCopayComponent } from './pverify-insurance-set-final-copay.component';

describe('PverifyInsuranceSetFinalCopayComponent', () => {
  let component: PverifyInsuranceSetFinalCopayComponent;
  let fixture: ComponentFixture<PverifyInsuranceSetFinalCopayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PverifyInsuranceSetFinalCopayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PverifyInsuranceSetFinalCopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
