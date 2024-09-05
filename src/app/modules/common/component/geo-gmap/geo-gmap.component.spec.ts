import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoGmapComponent } from './geo-gmap.component';

describe('GeoGmapComponent', () => {
  let component: GeoGmapComponent;
  let fixture: ComponentFixture<GeoGmapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoGmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoGmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
