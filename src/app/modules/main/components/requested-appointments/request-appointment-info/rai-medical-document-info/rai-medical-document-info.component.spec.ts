import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiMedicalDocumentInfoComponent } from './rai-medical-document-info.component';

describe('RaiMedicalDocumentInfoComponent', () => {
  let component: RaiMedicalDocumentInfoComponent;
  let fixture: ComponentFixture<RaiMedicalDocumentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiMedicalDocumentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiMedicalDocumentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
