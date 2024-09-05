import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfoPersonalInfoComponent } from './rainfo-personal-info.component';

describe('RainfoPersonalInfoComponent', () => {
  let component: RainfoPersonalInfoComponent;
  let fixture: ComponentFixture<RainfoPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainfoPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RainfoPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
