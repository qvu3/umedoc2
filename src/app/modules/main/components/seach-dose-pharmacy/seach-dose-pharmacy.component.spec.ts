import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachDosePharmacyComponent } from './seach-dose-pharmacy.component';

describe('SeachDosePharmacyComponent', () => {
  let component: SeachDosePharmacyComponent;
  let fixture: ComponentFixture<SeachDosePharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeachDosePharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachDosePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
