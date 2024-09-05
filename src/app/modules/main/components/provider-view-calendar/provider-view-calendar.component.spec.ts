import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderViewCalendarComponent } from './provider-view-calendar.component';

describe('ProviderViewCalendarComponent', () => {
  let component: ProviderViewCalendarComponent;
  let fixture: ComponentFixture<ProviderViewCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderViewCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderViewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
