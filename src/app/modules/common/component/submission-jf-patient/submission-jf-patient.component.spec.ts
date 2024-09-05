import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionJfPatientComponent } from './submission-jf-patient.component';

describe('SubmissionJfPatientComponent', () => {
  let component: SubmissionJfPatientComponent;
  let fixture: ComponentFixture<SubmissionJfPatientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionJfPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionJfPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
