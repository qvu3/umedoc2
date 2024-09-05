import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDocumentComponent } from './medical-document.component';

describe('MedicalDocumentComponent', () => {
  let component: MedicalDocumentComponent;
  let fixture: ComponentFixture<MedicalDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
