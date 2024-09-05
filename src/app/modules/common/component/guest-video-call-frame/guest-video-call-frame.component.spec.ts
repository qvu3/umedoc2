import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVideoCallFrameComponent } from './guest-video-call-frame.component';

describe('GuestVideoCallFrameComponent', () => {
  let component: GuestVideoCallFrameComponent;
  let fixture: ComponentFixture<GuestVideoCallFrameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestVideoCallFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestVideoCallFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
