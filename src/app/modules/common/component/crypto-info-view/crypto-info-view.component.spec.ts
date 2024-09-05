import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoInfoViewComponent } from './crypto-info-view.component';

describe('CryptoInfoViewComponent', () => {
  let component: CryptoInfoViewComponent;
  let fixture: ComponentFixture<CryptoInfoViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoInfoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
