import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PverifyInsuranceModalComponent } from './pverify-insurance-modal.component';

describe('PverifyInsuranceModalComponent', () => {
  let component: PverifyInsuranceModalComponent;
  let fixture: ComponentFixture<PverifyInsuranceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PverifyInsuranceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PverifyInsuranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
