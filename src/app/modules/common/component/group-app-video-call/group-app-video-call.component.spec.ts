import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAppVideoCallComponent } from './group-app-video-call.component';

describe('GroupAppVideoCallComponent', () => {
  let component: GroupAppVideoCallComponent;
  let fixture: ComponentFixture<GroupAppVideoCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAppVideoCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAppVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
