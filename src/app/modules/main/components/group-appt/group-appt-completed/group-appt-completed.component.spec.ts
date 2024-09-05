import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptCompletedComponent } from './group-appt-completed.component';

describe('GroupApptCompletedComponent', () => {
  let component: GroupApptCompletedComponent;
  let fixture: ComponentFixture<GroupApptCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
