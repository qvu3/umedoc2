import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingRoomForGuestComponent } from './waiting-room-for-guest.component';

describe('WaitingRoomForGuestComponent', () => {
  let component: WaitingRoomForGuestComponent;
  let fixture: ComponentFixture<WaitingRoomForGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingRoomForGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRoomForGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
