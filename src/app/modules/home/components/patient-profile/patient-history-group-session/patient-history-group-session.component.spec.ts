import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryGroupSessionComponent } from './patient-history-group-session.component';

describe('PatientHistoryGroupSessionComponent', () => {
  let component: PatientHistoryGroupSessionComponent;
  let fixture: ComponentFixture<PatientHistoryGroupSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryGroupSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryGroupSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
