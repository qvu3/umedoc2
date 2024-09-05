import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarkerComponent } from './view-marker.component';

describe('ViewMarkerComponent', () => {
  let component: ViewMarkerComponent;
  let fixture: ComponentFixture<ViewMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
