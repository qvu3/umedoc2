import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderFinishSignUpComponent } from './provider-finish-sign-up.component';

describe('ProviderFinishSignUpComponent', () => {
  let component: ProviderFinishSignUpComponent;
  let fixture: ComponentFixture<ProviderFinishSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderFinishSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderFinishSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
