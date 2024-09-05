import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTaskListTabComponent } from './patient-task-list-tab.component';

describe('PatientTaskListTabComponent', () => {
  let component: PatientTaskListTabComponent;
  let fixture: ComponentFixture<PatientTaskListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTaskListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTaskListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
