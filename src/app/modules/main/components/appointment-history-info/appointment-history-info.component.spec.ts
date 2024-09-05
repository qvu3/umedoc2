import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHistoryInfoComponent } from './appointment-history-info.component';

describe('AppointmentHistoryInfoComponent', () => {
  let component: AppointmentHistoryInfoComponent;
  let fixture: ComponentFixture<AppointmentHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
