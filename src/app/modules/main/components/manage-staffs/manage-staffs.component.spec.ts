import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffsComponent } from './manage-staffs.component';

describe('ManageStaffsComponent', () => {
  let component: ManageStaffsComponent;
  let fixture: ComponentFixture<ManageStaffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStaffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
