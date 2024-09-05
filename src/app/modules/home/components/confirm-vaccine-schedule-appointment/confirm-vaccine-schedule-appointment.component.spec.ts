import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVaccineScheduleAppointmentComponent } from './confirm-vaccine-schedule-appointment.component';

describe('ConfirmVaccineScheduleAppointmentComponent', () => {
  let component: ConfirmVaccineScheduleAppointmentComponent;
  let fixture: ComponentFixture<ConfirmVaccineScheduleAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmVaccineScheduleAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmVaccineScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
