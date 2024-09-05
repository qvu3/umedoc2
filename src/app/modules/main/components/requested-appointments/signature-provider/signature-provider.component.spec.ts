import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureProviderComponent } from './signature-provider.component';

describe('SignatureProviderComponent', () => {
  let component: SignatureProviderComponent;
  let fixture: ComponentFixture<SignatureProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
