import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShowChatComponent } from './message-show-chat.component';

describe('MessageShowChatComponent', () => {
  let component: MessageShowChatComponent;
  let fixture: ComponentFixture<MessageShowChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageShowChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageShowChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
