import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDocumentsTabComponent } from './medical-documents-tab.component';

describe('MedicalDocumentsTabComponent', () => {
  let component: MedicalDocumentsTabComponent;
  let fixture: ComponentFixture<MedicalDocumentsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalDocumentsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDocumentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
