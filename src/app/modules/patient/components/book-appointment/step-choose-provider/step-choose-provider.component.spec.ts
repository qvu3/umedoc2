import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepChooseProviderComponent } from './step-choose-provider.component';

describe('StepChooseProviderComponent', () => {
  let component: StepChooseProviderComponent;
  let fixture: ComponentFixture<StepChooseProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepChooseProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepChooseProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
