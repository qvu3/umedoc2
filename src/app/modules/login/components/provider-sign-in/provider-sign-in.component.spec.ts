import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSignInComponent } from './provider-sign-in.component';

describe('ProviderSignInComponent', () => {
  let component: ProviderSignInComponent;
  let fixture: ComponentFixture<ProviderSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
