import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentHistoryInfoTabComponent } from './patient-appointment-history-info-tab.component';

describe('PatientAppointmentHistoryInfoTabComponent', () => {
  let component: PatientAppointmentHistoryInfoTabComponent;
  let fixture: ComponentFixture<PatientAppointmentHistoryInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAppointmentHistoryInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentHistoryInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
