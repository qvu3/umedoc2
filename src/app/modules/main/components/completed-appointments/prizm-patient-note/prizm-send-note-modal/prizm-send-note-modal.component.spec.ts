import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmSendNoteModalComponent } from './prizm-send-note-modal.component';

describe('PrizmSendNoteModalComponent', () => {
  let component: PrizmSendNoteModalComponent;
  let fixture: ComponentFixture<PrizmSendNoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizmSendNoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmSendNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
