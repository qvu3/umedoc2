import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRoomComponent } from './contact-room.component';

describe('ContactRoomComponent', () => {
  let component: ContactRoomComponent;
  let fixture: ComponentFixture<ContactRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
