import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PverifyDisableReasonComponent } from './pverify-disable-reason.component';

describe('PverifyDisableReasonComponent', () => {
  let component: PverifyDisableReasonComponent;
  let fixture: ComponentFixture<PverifyDisableReasonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PverifyDisableReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PverifyDisableReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
