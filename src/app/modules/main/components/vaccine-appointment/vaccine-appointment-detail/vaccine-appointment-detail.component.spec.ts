import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineAppointmentDetailComponent } from './vaccine-appointment-detail.component';

describe('VaccineAppointmentDetailComponent', () => {
  let component: VaccineAppointmentDetailComponent;
  let fixture: ComponentFixture<VaccineAppointmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineAppointmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineAppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
