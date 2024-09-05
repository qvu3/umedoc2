import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileNewComponent } from './patient-profile-new.component';

describe('PatientProfileNewComponent', () => {
  let component: PatientProfileNewComponent;
  let fixture: ComponentFixture<PatientProfileNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfileNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
