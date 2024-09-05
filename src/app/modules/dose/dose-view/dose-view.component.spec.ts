import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseViewComponent } from './dose-view.component';

describe('DoseViewComponent', () => {
  let component: DoseViewComponent;
  let fixture: ComponentFixture<DoseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
