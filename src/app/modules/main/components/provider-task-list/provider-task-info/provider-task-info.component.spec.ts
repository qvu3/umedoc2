import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTaskInfoComponent } from './provider-task-info.component';

describe('ProviderTaskInfoComponent', () => {
  let component: ProviderTaskInfoComponent;
  let fixture: ComponentFixture<ProviderTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderTaskInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
