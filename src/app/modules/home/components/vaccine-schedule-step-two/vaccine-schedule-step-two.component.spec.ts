import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineScheduleStepTwoComponent } from './vaccine-schedule-step-two.component';

describe('VaccineScheduleStepTwoComponent', () => {
  let component: VaccineScheduleStepTwoComponent;
  let fixture: ComponentFixture<VaccineScheduleStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineScheduleStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineScheduleStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
