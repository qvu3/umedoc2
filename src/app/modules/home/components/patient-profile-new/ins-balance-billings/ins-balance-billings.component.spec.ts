import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsBalanceBillingsComponent } from './ins-balance-billings.component';

describe('InsBalanceBillingsComponent', () => {
  let component: InsBalanceBillingsComponent;
  let fixture: ComponentFixture<InsBalanceBillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsBalanceBillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsBalanceBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
