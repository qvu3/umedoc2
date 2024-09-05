import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmSendPrescriptionModalComponent } from './prizm-send-prescription-modal.component';

describe('PrizmSendPrescriptionModalComponent', () => {
  let component: PrizmSendPrescriptionModalComponent;
  let fixture: ComponentFixture<PrizmSendPrescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizmSendPrescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmSendPrescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
