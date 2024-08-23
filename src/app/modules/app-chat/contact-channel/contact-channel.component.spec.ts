import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactChannelComponent } from './contact-channel.component';

describe('ContactChannelComponent', () => {
  let component: ContactChannelComponent;
  let fixture: ComponentFixture<ContactChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
