import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMedicalProfileComponent } from './provider-medical-profile.component';

describe('ProviderMedicalProfileComponent', () => {
  let component: ProviderMedicalProfileComponent;
  let fixture: ComponentFixture<ProviderMedicalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMedicalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMedicalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
