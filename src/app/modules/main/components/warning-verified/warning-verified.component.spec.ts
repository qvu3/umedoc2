import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningVerifiedComponent } from './warning-verified.component';

describe('WarningVerifiedComponent', () => {
  let component: WarningVerifiedComponent;
  let fixture: ComponentFixture<WarningVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
