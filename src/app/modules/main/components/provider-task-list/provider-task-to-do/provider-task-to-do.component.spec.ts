import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTaskToDoComponent } from './provider-task-to-do.component';

describe('ProviderTaskToDoComponent', () => {
  let component: ProviderTaskToDoComponent;
  let fixture: ComponentFixture<ProviderTaskToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderTaskToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTaskToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
