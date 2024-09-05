import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePaymentModalComponent } from './charge-payment-modal.component';

describe('ChargePaymentModalComponent', () => {
  let component: ChargePaymentModalComponent;
  let fixture: ComponentFixture<ChargePaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargePaymentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
