import { TestBed } from '@angular/core/testing';

import { PverifyCheckHistoryService } from './pverify-check-history.service';

describe('PverifyCheckHistoryService', () => {
  let service: PverifyCheckHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PverifyCheckHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
