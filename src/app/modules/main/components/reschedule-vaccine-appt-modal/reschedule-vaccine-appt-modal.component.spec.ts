import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleVaccineApptModalComponent } from './reschedule-vaccine-appt-modal.component';

describe('RescheduleVaccineApptModalComponent', () => {
  let component: RescheduleVaccineApptModalComponent;
  let fixture: ComponentFixture<RescheduleVaccineApptModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheduleVaccineApptModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleVaccineApptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
