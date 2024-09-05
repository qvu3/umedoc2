import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePatientComponent } from './signature-patient.component';

describe('SignaturePatientComponent', () => {
  let component: SignaturePatientComponent;
  let fixture: ComponentFixture<SignaturePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
