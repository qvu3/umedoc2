import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIcdModalComponent } from './add-icd-modal.component';

describe('AddIcdModalComponent', () => {
  let component: AddIcdModalComponent;
  let fixture: ComponentFixture<AddIcdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIcdModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIcdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
