import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAppointmentInfoComponent } from './request-appointment-info.component';

describe('RequestAppointmentInfoComponent', () => {
  let component: RequestAppointmentInfoComponent;
  let fixture: ComponentFixture<RequestAppointmentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAppointmentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAppointmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
