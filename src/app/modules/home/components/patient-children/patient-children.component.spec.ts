import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChildrenComponent } from './patient-children.component';

describe('PatientChildrenComponent', () => {
  let component: PatientChildrenComponent;
  let fixture: ComponentFixture<PatientChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
