import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepApptInsuranceComponent } from './step-appt-insurance.component';

describe('StepApptInsuranceComponent', () => {
  let component: StepApptInsuranceComponent;
  let fixture: ComponentFixture<StepApptInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepApptInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepApptInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
