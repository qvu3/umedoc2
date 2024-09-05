import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliverStatusModalComponent } from './view-deliver-status-modal.component';

describe('ViewDeliverStatusModalComponent', () => {
  let component: ViewDeliverStatusModalComponent;
  let fixture: ComponentFixture<ViewDeliverStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliverStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliverStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
