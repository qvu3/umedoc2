import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedPatientLogComponent } from './restricted-patient-log.component';

describe('RestrictedPatientLogComponent', () => {
  let component: RestrictedPatientLogComponent;
  let fixture: ComponentFixture<RestrictedPatientLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedPatientLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedPatientLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
