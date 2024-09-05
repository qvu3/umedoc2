import { ChatAvatarPipe } from './chat-avatar.pipe';

describe('ChatAvatarPipe', () => {
  it('create an instance', () => {
    const pipe = new ChatAvatarPipe();
    expect(pipe).toBeTruthy();
  });
});
