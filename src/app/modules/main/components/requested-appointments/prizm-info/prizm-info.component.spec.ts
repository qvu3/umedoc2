import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizmInfoComponent } from './prizm-info.component';

describe('PrizmInfoComponent', () => {
  let component: PrizmInfoComponent;
  let fixture: ComponentFixture<PrizmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
