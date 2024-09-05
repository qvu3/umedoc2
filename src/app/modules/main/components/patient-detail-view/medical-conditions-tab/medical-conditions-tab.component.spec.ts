import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConditionsTabComponent } from './medical-conditions-tab.component';

describe('MedicalConditionsTabComponent', () => {
  let component: MedicalConditionsTabComponent;
  let fixture: ComponentFixture<MedicalConditionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalConditionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalConditionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
