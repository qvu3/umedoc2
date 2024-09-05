import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInsuranceComponent } from './step-insurance.component';

describe('StepInsuranceComponent', () => {
  let component: StepInsuranceComponent;
  let fixture: ComponentFixture<StepInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
