import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePrescriptionPdfModalComponent } from './generate-prescription-pdf-modal.component';

describe('GeneratePrescriptionPdfModalComponent', () => {
  let component: GeneratePrescriptionPdfModalComponent;
  let fixture: ComponentFixture<GeneratePrescriptionPdfModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePrescriptionPdfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePrescriptionPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
