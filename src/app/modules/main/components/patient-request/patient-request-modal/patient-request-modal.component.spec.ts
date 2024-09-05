import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRequestModalComponent } from './patient-request-modal.component';

describe('PatientRequestModalComponent', () => {
  let component: PatientRequestModalComponent;
  let fixture: ComponentFixture<PatientRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
