import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChildModalComponent } from './patient-child-modal.component';

describe('PatientChildModalComponent', () => {
  let component: PatientChildModalComponent;
  let fixture: ComponentFixture<PatientChildModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChildModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChildModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
