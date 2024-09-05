import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentClincialNoteComponent } from './appointment-clincial-note.component';

describe('AppointmentClincialNoteComponent', () => {
  let component: AppointmentClincialNoteComponent;
  let fixture: ComponentFixture<AppointmentClincialNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentClincialNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentClincialNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
