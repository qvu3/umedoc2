import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTicketsComponent } from './patient-tickets.component';

describe('PatientTicketsComponent', () => {
  let component: PatientTicketsComponent;
  let fixture: ComponentFixture<PatientTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
