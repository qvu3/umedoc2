import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSmsVerifyComponent } from './provider-sms-verify.component';

describe('ProviderSmsVerifyComponent', () => {
  let component: ProviderSmsVerifyComponent;
  let fixture: ComponentFixture<ProviderSmsVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSmsVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSmsVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
