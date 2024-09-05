import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProviderAppointmentComponent } from './schedule-provider-appointment.component';

describe('ScheduleProviderAppointmentComponent', () => {
  let component: ScheduleProviderAppointmentComponent;
  let fixture: ComponentFixture<ScheduleProviderAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleProviderAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleProviderAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
