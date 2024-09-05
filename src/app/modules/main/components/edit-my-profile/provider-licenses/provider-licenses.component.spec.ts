import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLicensesComponent } from './provider-licenses.component';

describe('ProviderLicensesComponent', () => {
  let component: ProviderLicensesComponent;
  let fixture: ComponentFixture<ProviderLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
