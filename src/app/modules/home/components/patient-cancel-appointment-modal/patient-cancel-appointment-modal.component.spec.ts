import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCancelAppointmentModalComponent } from './patient-cancel-appointment-modal.component';

describe('PatientCancelAppointmentModalComponent', () => {
  let component: PatientCancelAppointmentModalComponent;
  let fixture: ComponentFixture<PatientCancelAppointmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCancelAppointmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCancelAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
