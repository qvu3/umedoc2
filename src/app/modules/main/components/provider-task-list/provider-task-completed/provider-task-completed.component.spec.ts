import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTaskCompletedComponent } from './provider-task-completed.component';

describe('ProviderTaskCompletedComponent', () => {
  let component: ProviderTaskCompletedComponent;
  let fixture: ComponentFixture<ProviderTaskCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderTaskCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTaskCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
