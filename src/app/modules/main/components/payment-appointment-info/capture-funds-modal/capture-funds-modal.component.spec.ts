import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureFundsModalComponent } from './capture-funds-modal.component';

describe('CaptureFundsModalComponent', () => {
  let component: CaptureFundsModalComponent;
  let fixture: ComponentFixture<CaptureFundsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureFundsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureFundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
