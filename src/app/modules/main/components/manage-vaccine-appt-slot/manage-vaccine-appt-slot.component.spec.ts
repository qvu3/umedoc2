import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVaccineApptSlotComponent } from './manage-vaccine-appt-slot.component';

describe('ManageVaccineApptSlotComponent', () => {
  let component: ManageVaccineApptSlotComponent;
  let fixture: ComponentFixture<ManageVaccineApptSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVaccineApptSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVaccineApptSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
