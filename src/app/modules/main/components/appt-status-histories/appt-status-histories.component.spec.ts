import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptStatusHistoriesComponent } from './appt-status-histories.component';

describe('ApptStatusHistoriesComponent', () => {
  let component: ApptStatusHistoriesComponent;
  let fixture: ComponentFixture<ApptStatusHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptStatusHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptStatusHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
