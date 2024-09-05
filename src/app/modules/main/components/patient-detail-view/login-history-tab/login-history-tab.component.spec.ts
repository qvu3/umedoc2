import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHistoryTabComponent } from './login-history-tab.component';

describe('LoginHistoryTabComponent', () => {
  let component: LoginHistoryTabComponent;
  let fixture: ComponentFixture<LoginHistoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHistoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
