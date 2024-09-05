import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaxNotificationViewComponent } from './fax-notification-view.component';

describe('FaxNotificationViewComponent', () => {
  let component: FaxNotificationViewComponent;
  let fixture: ComponentFixture<FaxNotificationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaxNotificationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaxNotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
