import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PverifyUploadImageComponent } from './pverify-upload-image.component';

describe('PverifyUploadImageComponent', () => {
  let component: PverifyUploadImageComponent;
  let fixture: ComponentFixture<PverifyUploadImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PverifyUploadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PverifyUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
