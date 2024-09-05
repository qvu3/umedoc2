import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLabOrderComponent } from './write-lab-order.component';

describe('WriteLabOrderComponent', () => {
  let component: WriteLabOrderComponent;
  let fixture: ComponentFixture<WriteLabOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteLabOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteLabOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
