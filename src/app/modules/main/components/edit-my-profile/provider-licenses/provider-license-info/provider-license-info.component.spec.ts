import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLicenseInfoComponent } from './provider-license-info.component';

describe('ProviderLicenseInfoComponent', () => {
  let component: ProviderLicenseInfoComponent;
  let fixture: ComponentFixture<ProviderLicenseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderLicenseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderLicenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
