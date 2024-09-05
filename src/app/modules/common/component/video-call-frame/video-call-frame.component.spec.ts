import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallFrameComponent } from './video-call-frame.component';

describe('VideoCallFrameComponent', () => {
  let component: VideoCallFrameComponent;
  let fixture: ComponentFixture<VideoCallFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCallFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
