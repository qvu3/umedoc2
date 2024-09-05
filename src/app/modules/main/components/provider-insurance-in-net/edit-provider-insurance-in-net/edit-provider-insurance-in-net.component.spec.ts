import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderInsuranceInNetComponent } from './edit-provider-insurance-in-net.component';

describe('EditProviderInsuranceInNetComponent', () => {
  let component: EditProviderInsuranceInNetComponent;
  let fixture: ComponentFixture<EditProviderInsuranceInNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderInsuranceInNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderInsuranceInNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
