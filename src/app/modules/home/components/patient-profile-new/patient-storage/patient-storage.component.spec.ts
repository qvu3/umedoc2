import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStorageComponent } from './patient-storage.component';

describe('PatientStorageComponent', () => {
  let component: PatientStorageComponent;
  let fixture: ComponentFixture<PatientStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
