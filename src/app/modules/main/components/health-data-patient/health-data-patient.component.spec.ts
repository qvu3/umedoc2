import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDataPatientComponent } from './health-data-patient.component';

describe('HealthDataPatientComponent', () => {
  let component: HealthDataPatientComponent;
  let fixture: ComponentFixture<HealthDataPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthDataPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDataPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
