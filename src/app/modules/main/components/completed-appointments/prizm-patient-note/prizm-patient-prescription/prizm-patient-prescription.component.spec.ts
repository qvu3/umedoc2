import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmPatientPrescriptionComponent } from './prizm-patient-prescription.component';

describe('PrizmPatientPrescriptionComponent', () => {
  let component: PrizmPatientPrescriptionComponent;
  let fixture: ComponentFixture<PrizmPatientPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizmPatientPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmPatientPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
