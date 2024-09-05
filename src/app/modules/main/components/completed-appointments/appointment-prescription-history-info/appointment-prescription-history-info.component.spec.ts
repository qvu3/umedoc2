import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPrescriptionHistoryInfoComponent } from './appointment-prescription-history-info.component';

describe('AppointmentPrescriptionHistoryInfoComponent', () => {
  let component: AppointmentPrescriptionHistoryInfoComponent;
  let fixture: ComponentFixture<AppointmentPrescriptionHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPrescriptionHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPrescriptionHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
