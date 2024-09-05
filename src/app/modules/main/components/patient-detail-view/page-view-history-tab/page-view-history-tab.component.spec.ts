import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewHistoryTabComponent } from './page-view-history-tab.component';

describe('PageViewHistoryTabComponent', () => {
  let component: PageViewHistoryTabComponent;
  let fixture: ComponentFixture<PageViewHistoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageViewHistoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
