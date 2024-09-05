import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDataCardComponent } from './health-data-card.component';

describe('HealthDataCardComponent', () => {
  let component: HealthDataCardComponent;
  let fixture: ComponentFixture<HealthDataCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthDataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
