import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileRequestAppointmentComponent } from './patient-profile-request-appointment.component';

describe('PatientProfileRequestAppointmentComponent', () => {
  let component: PatientProfileRequestAppointmentComponent;
  let fixture: ComponentFixture<PatientProfileRequestAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfileRequestAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileRequestAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
