import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossReasonComponent } from './weight-loss-reason.component';

describe('WeightLossReasonComponent', () => {
  let component: WeightLossReasonComponent;
  let fixture: ComponentFixture<WeightLossReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
