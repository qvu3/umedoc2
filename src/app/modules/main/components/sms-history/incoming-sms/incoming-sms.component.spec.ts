import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSmsComponent } from './incoming-sms.component';

describe('IncomingSmsComponent', () => {
  let component: IncomingSmsComponent;
  let fixture: ComponentFixture<IncomingSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
