import { TestBed } from '@angular/core/testing';

import { AppChatService } from './app-chat.service';

describe('AppChatService', () => {
  let service: AppChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
