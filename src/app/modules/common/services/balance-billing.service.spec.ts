import { TestBed } from '@angular/core/testing';

import { BalanceBillingService } from './balance-billing.service';

describe('BalanceBillingService', () => {
  let service: BalanceBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
