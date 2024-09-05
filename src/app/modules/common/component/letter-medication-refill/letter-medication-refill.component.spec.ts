import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterMedicationRefillComponent } from './letter-medication-refill.component';

describe('LetterMedicationRefillComponent', () => {
  let component: LetterMedicationRefillComponent;
  let fixture: ComponentFixture<LetterMedicationRefillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterMedicationRefillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterMedicationRefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
