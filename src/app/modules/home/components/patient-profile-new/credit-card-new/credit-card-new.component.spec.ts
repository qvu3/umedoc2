import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardNewComponent } from './credit-card-new.component';

describe('CreditCardNewComponent', () => {
  let component: CreditCardNewComponent;
  let fixture: ComponentFixture<CreditCardNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
