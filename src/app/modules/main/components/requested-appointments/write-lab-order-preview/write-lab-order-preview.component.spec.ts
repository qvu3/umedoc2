import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLabOrderPreviewComponent } from './write-lab-order-preview.component';

describe('WriteLabOrderPreviewComponent', () => {
  let component: WriteLabOrderPreviewComponent;
  let fixture: ComponentFixture<WriteLabOrderPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteLabOrderPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteLabOrderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
