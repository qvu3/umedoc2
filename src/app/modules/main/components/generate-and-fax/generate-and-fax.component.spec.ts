import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAndFaxComponent } from './generate-and-fax.component';

describe('GenerateAndFaxComponent', () => {
  let component: GenerateAndFaxComponent;
  let fixture: ComponentFixture<GenerateAndFaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAndFaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAndFaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
