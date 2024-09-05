import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptReviewComponent } from './appt-review.component';

describe('ApptReviewComponent', () => {
  let component: ApptReviewComponent;
  let fixture: ComponentFixture<ApptReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
