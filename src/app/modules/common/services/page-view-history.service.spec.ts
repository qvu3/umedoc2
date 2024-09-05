import { TestBed } from '@angular/core/testing';

import { PageViewHistoryService } from './page-view-history.service';

describe('PageViewHistoryService', () => {
  let service: PageViewHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageViewHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
