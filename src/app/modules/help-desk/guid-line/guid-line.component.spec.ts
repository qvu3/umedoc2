import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidLineComponent } from './guid-line.component';

describe('GuidLineComponent', () => {
  let component: GuidLineComponent;
  let fixture: ComponentFixture<GuidLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
