import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryInfoComponent } from './payment-history-info.component';

describe('PaymentHistoryInfoComponent', () => {
  let component: PaymentHistoryInfoComponent;
  let fixture: ComponentFixture<PaymentHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
