import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginHistoryComponent } from './staff-login-history.component';

describe('StaffLoginHistoryComponent', () => {
  let component: StaffLoginHistoryComponent;
  let fixture: ComponentFixture<StaffLoginHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffLoginHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
