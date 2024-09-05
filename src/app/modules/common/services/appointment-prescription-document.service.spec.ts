import { TestBed } from '@angular/core/testing';

import { AppointmentPrescriptionDocumentService } from './appointment-prescription-document.service';

describe('AppointmentPrescriptionDocumentService', () => {
  let service: AppointmentPrescriptionDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentPrescriptionDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
