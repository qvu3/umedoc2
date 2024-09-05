import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleModalComponent } from './reschedule-modal.component';

describe('RescheduleModalComponent', () => {
  let component: RescheduleModalComponent;
  let fixture: ComponentFixture<RescheduleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheduleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
