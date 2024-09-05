import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApptDocumentsComponent } from './group-appt-documents.component';

describe('GroupApptDocumentsComponent', () => {
  let component: GroupApptDocumentsComponent;
  let fixture: ComponentFixture<GroupApptDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApptDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApptDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
