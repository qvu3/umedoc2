import { TestBed } from '@angular/core/testing';

import { PverifyPatientInsuranceService } from './pverify-patient-insurance.service';

describe('PverifyPatientInsuranceService', () => {
  let service: PverifyPatientInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PverifyPatientInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
