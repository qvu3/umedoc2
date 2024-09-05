import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendSmsRegisterComponent } from './resend-sms-register.component';

describe('ResendSmsRegisterComponent', () => {
  let component: ResendSmsRegisterComponent;
  let fixture: ComponentFixture<ResendSmsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendSmsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendSmsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
