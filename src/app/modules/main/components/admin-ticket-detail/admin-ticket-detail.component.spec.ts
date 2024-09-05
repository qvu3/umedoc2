import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketDetailComponent } from './admin-ticket-detail.component';

describe('AdminTicketDetailComponent', () => {
  let component: AdminTicketDetailComponent;
  let fixture: ComponentFixture<AdminTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
