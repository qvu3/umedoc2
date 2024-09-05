import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTicketDetailComponent } from './patient-ticket-detail.component';

describe('PatientTicketDetailComponent', () => {
  let component: PatientTicketDetailComponent;
  let fixture: ComponentFixture<PatientTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
