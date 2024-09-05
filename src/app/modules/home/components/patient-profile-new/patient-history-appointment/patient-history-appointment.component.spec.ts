import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryAppointmentComponent } from './patient-history-appointment.component';

describe('PatientHistoryAppointmentComponent', () => {
  let component: PatientHistoryAppointmentComponent;
  let fixture: ComponentFixture<PatientHistoryAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
