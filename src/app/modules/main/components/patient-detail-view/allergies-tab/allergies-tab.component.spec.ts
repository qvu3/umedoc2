import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesTabComponent } from './allergies-tab.component';

describe('AllergiesTabComponent', () => {
  let component: AllergiesTabComponent;
  let fixture: ComponentFixture<AllergiesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergiesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergiesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
