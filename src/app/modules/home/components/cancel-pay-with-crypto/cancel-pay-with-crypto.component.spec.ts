import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPayWithCryptoComponent } from './cancel-pay-with-crypto.component';

describe('CancelPayWithCryptoComponent', () => {
  let component: CancelPayWithCryptoComponent;
  let fixture: ComponentFixture<CancelPayWithCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelPayWithCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPayWithCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
