import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGroupComponent } from './provider-group.component';

describe('ProviderGroupComponent', () => {
  let component: ProviderGroupComponent;
  let fixture: ComponentFixture<ProviderGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
