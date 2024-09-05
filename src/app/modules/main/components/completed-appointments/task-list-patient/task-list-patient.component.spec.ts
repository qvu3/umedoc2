import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListPatientComponent } from './task-list-patient.component';

describe('TaskListPatientComponent', () => {
  let component: TaskListPatientComponent;
  let fixture: ComponentFixture<TaskListPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
