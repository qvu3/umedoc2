import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPatientsComponent } from './management-patients.component';

describe('ManagementPatientsComponent', () => {
  let component: ManagementPatientsComponent;
  let fixture: ComponentFixture<ManagementPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
