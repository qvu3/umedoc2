import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileViewComponent } from './patient-profile-view.component';

describe('PatientProfileViewComponent', () => {
  let component: PatientProfileViewComponent;
  let fixture: ComponentFixture<PatientProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
