import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptInviteUserComponent } from './group-appt-invite-user.component';

describe('GroupApptInviteUserComponent', () => {
  let component: GroupApptInviteUserComponent;
  let fixture: ComponentFixture<GroupApptInviteUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptInviteUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptInviteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
