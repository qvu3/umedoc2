import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBlockedListModalComponent } from './patient-blocked-list-modal.component';

describe('PatientBlockedListModalComponent', () => {
  let component: PatientBlockedListModalComponent;
  let fixture: ComponentFixture<PatientBlockedListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBlockedListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBlockedListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
