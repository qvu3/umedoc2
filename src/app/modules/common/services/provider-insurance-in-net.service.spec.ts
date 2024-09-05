import { TestBed } from '@angular/core/testing';

import { ProviderInsuranceInNetService } from './provider-insurance-in-net.service';

describe('ProviderInsuranceInNetService', () => {
  let service: ProviderInsuranceInNetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderInsuranceInNetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
