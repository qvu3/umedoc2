import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingSmsComponent } from './outgoing-sms.component';

describe('OutgoingSmsComponent', () => {
  let component: OutgoingSmsComponent;
  let fixture: ComponentFixture<OutgoingSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
