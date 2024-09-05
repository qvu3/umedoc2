import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffProfileComponent } from './add-staff-profile.component';

describe('AddStaffProfileComponent', () => {
  let component: AddStaffProfileComponent;
  let fixture: ComponentFixture<AddStaffProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
