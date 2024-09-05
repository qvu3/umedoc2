import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChildrenViewComponent } from './patient-children-view.component';

describe('PatientChildrenViewComponent', () => {
  let component: PatientChildrenViewComponent;
  let fixture: ComponentFixture<PatientChildrenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChildrenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChildrenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
