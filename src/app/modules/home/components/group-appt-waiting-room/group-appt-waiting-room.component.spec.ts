import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptWaitingRoomComponent } from './group-appt-waiting-room.component';

describe('GroupApptWaitingRoomComponent', () => {
  let component: GroupApptWaitingRoomComponent;
  let fixture: ComponentFixture<GroupApptWaitingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptWaitingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
