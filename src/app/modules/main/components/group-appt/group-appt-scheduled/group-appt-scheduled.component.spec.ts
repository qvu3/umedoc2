import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptScheduledComponent } from './group-appt-scheduled.component';

describe('GroupApptScheduledComponent', () => {
  let component: GroupApptScheduledComponent;
  let fixture: ComponentFixture<GroupApptScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
