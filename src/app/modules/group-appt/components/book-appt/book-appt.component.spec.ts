import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookApptComponent } from './book-appt.component';

describe('BookApptComponent', () => {
  let component: BookApptComponent;
  let fixture: ComponentFixture<BookApptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookApptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
