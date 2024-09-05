import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReasonComponent } from './step-reason.component';

describe('StepReasonComponent', () => {
  let component: StepReasonComponent;
  let fixture: ComponentFixture<StepReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
