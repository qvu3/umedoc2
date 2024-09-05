import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAppointmentSlotComponent } from './provider-appointment-slot.component';

describe('ProviderAppointmentSlotComponent', () => {
  let component: ProviderAppointmentSlotComponent;
  let fixture: ComponentFixture<ProviderAppointmentSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAppointmentSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAppointmentSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
