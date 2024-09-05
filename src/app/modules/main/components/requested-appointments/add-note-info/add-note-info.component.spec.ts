import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteInfoComponent } from './add-note-info.component';

describe('AddNoteInfoComponent', () => {
  let component: AddNoteInfoComponent;
  let fixture: ComponentFixture<AddNoteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
