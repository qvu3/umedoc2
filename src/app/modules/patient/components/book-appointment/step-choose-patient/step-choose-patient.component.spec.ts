import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepChoosePatientComponent } from './step-choose-patient.component';

describe('StepChoosePatientComponent', () => {
  let component: StepChoosePatientComponent;
  let fixture: ComponentFixture<StepChoosePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepChoosePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepChoosePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
