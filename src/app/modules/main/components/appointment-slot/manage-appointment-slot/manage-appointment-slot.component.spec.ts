import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppointmentSlotComponent } from './manage-appointment-slot.component';

describe('ManageAppointmentSlotComponent', () => {
  let component: ManageAppointmentSlotComponent;
  let fixture: ComponentFixture<ManageAppointmentSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppointmentSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppointmentSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
