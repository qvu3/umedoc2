import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiExHistoryComponent } from './rai-ex-history.component';

describe('RaiExHistoryComponent', () => {
  let component: RaiExHistoryComponent;
  let fixture: ComponentFixture<RaiExHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiExHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiExHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
