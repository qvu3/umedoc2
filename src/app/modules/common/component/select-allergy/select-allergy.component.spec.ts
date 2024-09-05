import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllergyComponent } from './select-allergy.component';

describe('SelectAllergyComponent', () => {
  let component: SelectAllergyComponent;
  let fixture: ComponentFixture<SelectAllergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAllergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
