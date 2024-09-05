import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffProfileComponent } from './edit-staff-profile.component';

describe('EditStaffProfileComponent', () => {
  let component: EditStaffProfileComponent;
  let fixture: ComponentFixture<EditStaffProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaffProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
