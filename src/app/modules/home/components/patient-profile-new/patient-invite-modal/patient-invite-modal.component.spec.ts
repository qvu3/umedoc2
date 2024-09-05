import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInviteModalComponent } from './patient-invite-modal.component';

describe('PatientInviteModalComponent', () => {
  let component: PatientInviteModalComponent;
  let fixture: ComponentFixture<PatientInviteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInviteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
