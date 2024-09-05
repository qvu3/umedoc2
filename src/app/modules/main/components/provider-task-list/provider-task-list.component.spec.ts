import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTaskListComponent } from './provider-task-list.component';

describe('ProviderTaskListComponent', () => {
  let component: ProviderTaskListComponent;
  let fixture: ComponentFixture<ProviderTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
