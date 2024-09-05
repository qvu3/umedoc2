import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineScheduleStepOneComponent } from './vaccine-schedule-step-one.component';

describe('VaccineScheduleStepOneComponent', () => {
  let component: VaccineScheduleStepOneComponent;
  let fixture: ComponentFixture<VaccineScheduleStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineScheduleStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineScheduleStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
