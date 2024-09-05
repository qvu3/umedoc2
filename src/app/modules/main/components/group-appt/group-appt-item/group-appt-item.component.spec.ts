import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptItemComponent } from './group-appt-item.component';

describe('GroupApptItemComponent', () => {
  let component: GroupApptItemComponent;
  let fixture: ComponentFixture<GroupApptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
