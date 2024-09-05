import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAppChatComponent } from './layout-app-chat.component';

describe('LayoutAppChatComponent', () => {
  let component: LayoutAppChatComponent;
  let fixture: ComponentFixture<LayoutAppChatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutAppChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAppChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
