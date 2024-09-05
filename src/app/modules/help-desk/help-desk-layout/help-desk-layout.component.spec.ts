import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskLayoutComponent } from './help-desk-layout.component';

describe('HelpDeskLayoutComponent', () => {
  let component: HelpDeskLayoutComponent;
  let fixture: ComponentFixture<HelpDeskLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDeskLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDeskLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
