import { TestBed } from '@angular/core/testing';

import { GroupApptDocumentsService } from './group-appt-documents.service';

describe('GroupApptDocumentsService', () => {
  let service: GroupApptDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupApptDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
