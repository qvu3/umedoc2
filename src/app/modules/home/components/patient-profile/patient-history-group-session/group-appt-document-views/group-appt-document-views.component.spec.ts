import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptDocumentViewsComponent } from './group-appt-document-views.component';

describe('GroupApptDocumentViewsComponent', () => {
  let component: GroupApptDocumentViewsComponent;
  let fixture: ComponentFixture<GroupApptDocumentViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptDocumentViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptDocumentViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
