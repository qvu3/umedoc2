import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPersonalInfoComponent } from './provider-personal-info.component';

describe('ProviderPersonalInfoComponent', () => {
  let component: ProviderPersonalInfoComponent;
  let fixture: ComponentFixture<ProviderPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
