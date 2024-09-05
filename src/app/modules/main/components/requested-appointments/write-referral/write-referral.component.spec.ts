import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReferralComponent } from './write-referral.component';

describe('WriteReferralComponent', () => {
  let component: WriteReferralComponent;
  let fixture: ComponentFixture<WriteReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
