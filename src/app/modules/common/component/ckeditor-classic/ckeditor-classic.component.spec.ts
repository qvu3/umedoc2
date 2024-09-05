import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorClassicComponent } from './ckeditor-classic.component';

describe('CkeditorClassicComponent', () => {
  let component: CkeditorClassicComponent;
  let fixture: ComponentFixture<CkeditorClassicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorClassicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
