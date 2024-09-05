import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSignInComponent } from './patient-sign-in.component';

describe('PatientSignInComponent', () => {
  let component: PatientSignInComponent;
  let fixture: ComponentFixture<PatientSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
