import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInsuranceInNetComponent } from './provider-insurance-in-net.component';

describe('ProviderInsuranceInNetComponent', () => {
  let component: ProviderInsuranceInNetComponent;
  let fixture: ComponentFixture<ProviderInsuranceInNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderInsuranceInNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderInsuranceInNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
