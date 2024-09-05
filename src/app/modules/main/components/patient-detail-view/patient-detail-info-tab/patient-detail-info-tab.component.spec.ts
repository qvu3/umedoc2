import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailInfoTabComponent } from './patient-detail-info-tab.component';

describe('PatientDetailInfoTabComponent', () => {
  let component: PatientDetailInfoTabComponent;
  let fixture: ComponentFixture<PatientDetailInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
