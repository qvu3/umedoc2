import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserCallTwillioComponent } from './browser-call-twillio.component';

describe('BrowserCallTwillioComponent', () => {
  let component: BrowserCallTwillioComponent;
  let fixture: ComponentFixture<BrowserCallTwillioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserCallTwillioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserCallTwillioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
