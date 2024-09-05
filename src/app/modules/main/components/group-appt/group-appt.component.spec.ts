import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptComponent } from './group-appt.component';

describe('GroupApptComponent', () => {
  let component: GroupApptComponent;
  let fixture: ComponentFixture<GroupApptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
