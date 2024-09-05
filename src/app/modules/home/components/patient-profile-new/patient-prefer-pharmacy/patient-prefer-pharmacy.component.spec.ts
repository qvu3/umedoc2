import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPreferPharmacyComponent } from './patient-prefer-pharmacy.component';

describe('PatientPreferPharmacyComponent', () => {
  let component: PatientPreferPharmacyComponent;
  let fixture: ComponentFixture<PatientPreferPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPreferPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPreferPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
