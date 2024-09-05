import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExcelReportComponent } from './generate-excel-report.component';

describe('GenerateExcelReportComponent', () => {
  let component: GenerateExcelReportComponent;
  let fixture: ComponentFixture<GenerateExcelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateExcelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateExcelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
