import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFinishedRegistrationComponent } from './patient-finished-registration.component';

describe('PatientFinishedRegistrationComponent', () => {
  let component: PatientFinishedRegistrationComponent;
  let fixture: ComponentFixture<PatientFinishedRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFinishedRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFinishedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
