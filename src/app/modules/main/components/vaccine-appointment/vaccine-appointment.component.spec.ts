import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineAppointmentComponent } from './vaccine-appointment.component';

describe('VaccineAppointmentComponent', () => {
  let component: VaccineAppointmentComponent;
  let fixture: ComponentFixture<VaccineAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
