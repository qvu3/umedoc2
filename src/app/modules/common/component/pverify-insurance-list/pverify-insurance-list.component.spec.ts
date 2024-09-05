import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PverifyInsuranceListComponent } from './pverify-insurance-list.component';

describe('PverifyInsuranceListComponent', () => {
  let component: PverifyInsuranceListComponent;
  let fixture: ComponentFixture<PverifyInsuranceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PverifyInsuranceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PverifyInsuranceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
