import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointmentSlotComponent } from './my-appointment-slot.component';

describe('MyAppointmentSlotComponent', () => {
  let component: MyAppointmentSlotComponent;
  let fixture: ComponentFixture<MyAppointmentSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppointmentSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
