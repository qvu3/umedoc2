import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoTabComponent } from './address-info-tab.component';

describe('AddressInfoTabComponent', () => {
  let component: AddressInfoTabComponent;
  let fixture: ComponentFixture<AddressInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
