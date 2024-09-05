import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRequestTableComponent } from './patient-request-table.component';

describe('PatientRequestTableComponent', () => {
  let component: PatientRequestTableComponent;
  let fixture: ComponentFixture<PatientRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRequestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
