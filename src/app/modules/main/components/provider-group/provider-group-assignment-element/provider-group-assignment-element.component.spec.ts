import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGroupAssignmentElementComponent } from './provider-group-assignment-element.component';

describe('ProviderGroupAssignmentElementComponent', () => {
  let component: ProviderGroupAssignmentElementComponent;
  let fixture: ComponentFixture<ProviderGroupAssignmentElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderGroupAssignmentElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderGroupAssignmentElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
