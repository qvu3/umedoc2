import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderStorageComponent } from './provider-storage.component';

describe('ProviderStorageComponent', () => {
  let component: ProviderStorageComponent;
  let fixture: ComponentFixture<ProviderStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
