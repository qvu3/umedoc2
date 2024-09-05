import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaxDocumentCompanyComponent } from './fax-document-company.component';

describe('FaxDocumentCompanyComponent', () => {
  let component: FaxDocumentCompanyComponent;
  let fixture: ComponentFixture<FaxDocumentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaxDocumentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaxDocumentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
