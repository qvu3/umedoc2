import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdcCountryInfoComponent } from './cdc-country-info.component';

describe('CdcCountryInfoComponent', () => {
  let component: CdcCountryInfoComponent;
  let fixture: ComponentFixture<CdcCountryInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CdcCountryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdcCountryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
