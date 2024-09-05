import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRoomComponent } from './contact-room.component';

describe('ContactRoomComponent', () => {
  let component: ContactRoomComponent;
  let fixture: ComponentFixture<ContactRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
