import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerferPharmacySearchComponent } from './perfer-pharmacy-search.component';

describe('PerferPharmacySearchComponent', () => {
  let component: PerferPharmacySearchComponent;
  let fixture: ComponentFixture<PerferPharmacySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerferPharmacySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerferPharmacySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
