import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPverifyPayerListComponent } from './management-pverify-payer-list.component';

describe('ManagementPverifyPayerListComponent', () => {
  let component: ManagementPverifyPayerListComponent;
  let fixture: ComponentFixture<ManagementPverifyPayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPverifyPayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPverifyPayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
