import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteGuestToVideoComponent } from './invite-guest-to-video.component';

describe('InviteGuestToVideoComponent', () => {
  let component: InviteGuestToVideoComponent;
  let fixture: ComponentFixture<InviteGuestToVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteGuestToVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteGuestToVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
