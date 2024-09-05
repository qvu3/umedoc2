import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmPatientNoteComponent } from './prizm-patient-note.component';

describe('PrizmPatientNoteComponent', () => {
  let component: PrizmPatientNoteComponent;
  let fixture: ComponentFixture<PrizmPatientNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizmPatientNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmPatientNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
