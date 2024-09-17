import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGroupSessionComponent } from './step-group-session.component';

describe('StepGroupSessionComponent', () => {
  let component: StepGroupSessionComponent;
  let fixture: ComponentFixture<StepGroupSessionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGroupSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGroupSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
