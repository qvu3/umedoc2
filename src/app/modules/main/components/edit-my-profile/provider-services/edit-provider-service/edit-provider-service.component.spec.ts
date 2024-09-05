import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderServiceComponent } from './edit-provider-service.component';

describe('EditProviderServiceComponent', () => {
  let component: EditProviderServiceComponent;
  let fixture: ComponentFixture<EditProviderServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
