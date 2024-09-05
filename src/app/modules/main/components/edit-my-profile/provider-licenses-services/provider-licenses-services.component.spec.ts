import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLicensesServicesComponent } from './provider-licenses-services.component';

describe('ProviderLicensesServicesComponent', () => {
  let component: ProviderLicensesServicesComponent;
  let fixture: ComponentFixture<ProviderLicensesServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderLicensesServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderLicensesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
