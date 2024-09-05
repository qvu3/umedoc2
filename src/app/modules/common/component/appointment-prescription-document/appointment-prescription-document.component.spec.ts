import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPrescriptionDocumentComponent } from './appointment-prescription-document.component';

describe('AppointmentPrescriptionDocumentComponent', () => {
  let component: AppointmentPrescriptionDocumentComponent;
  let fixture: ComponentFixture<AppointmentPrescriptionDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPrescriptionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPrescriptionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
