import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPayWithCryptoComponent } from './completed-pay-with-crypto.component';

describe('CompletedPayWithCryptoComponent', () => {
  let component: CompletedPayWithCryptoComponent;
  let fixture: ComponentFixture<CompletedPayWithCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedPayWithCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPayWithCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
