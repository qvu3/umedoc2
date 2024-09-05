import { TestBed } from '@angular/core/testing';

import { PatientSubscriptionService } from './patient-subscription.service';

describe('PatientSubscriptionService', () => {
  let service: PatientSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
