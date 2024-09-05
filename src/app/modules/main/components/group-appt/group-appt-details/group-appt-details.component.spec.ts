import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptDetailsComponent } from './group-appt-details.component';

describe('GroupApptDetailsComponent', () => {
  let component: GroupApptDetailsComponent;
  let fixture: ComponentFixture<GroupApptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
