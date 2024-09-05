import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableProviderComponent } from './available-provider.component';

describe('AvailableProviderComponent', () => {
  let component: AvailableProviderComponent;
  let fixture: ComponentFixture<AvailableProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
