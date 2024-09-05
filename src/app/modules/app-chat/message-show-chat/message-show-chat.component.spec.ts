import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShowChatComponent } from './message-show-chat.component';

describe('MessageShowChatComponent', () => {
  let component: MessageShowChatComponent;
  let fixture: ComponentFixture<MessageShowChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageShowChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageShowChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
