import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDocumentComponent } from './appointment-document.component';

describe('AppointmentDocumentComponent', () => {
  let component: AppointmentDocumentComponent;
  let fixture: ComponentFixture<AppointmentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
