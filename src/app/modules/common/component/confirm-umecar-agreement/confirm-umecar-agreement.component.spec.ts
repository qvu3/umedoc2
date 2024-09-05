import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUmecarAgreementComponent } from './confirm-umecar-agreement.component';

describe('ConfirmUmecarAgreementComponent', () => {
  let component: ConfirmUmecarAgreementComponent;
  let fixture: ComponentFixture<ConfirmUmecarAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUmecarAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUmecarAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
