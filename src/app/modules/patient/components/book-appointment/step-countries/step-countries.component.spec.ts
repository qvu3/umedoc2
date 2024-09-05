import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCountriesComponent } from './step-countries.component';

describe('StepCountriesComponent', () => {
  let component: StepCountriesComponent;
  let fixture: ComponentFixture<StepCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
