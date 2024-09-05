import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderGroupComponent } from './edit-provider-group.component';

describe('EditProviderGroupComponent', () => {
  let component: EditProviderGroupComponent;
  let fixture: ComponentFixture<EditProviderGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
