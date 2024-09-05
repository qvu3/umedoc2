import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiApptHistoryInfoComponent } from './rai-appt-history-info.component';

describe('RaiApptHistoryInfoComponent', () => {
  let component: RaiApptHistoryInfoComponent;
  let fixture: ComponentFixture<RaiApptHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiApptHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiApptHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
