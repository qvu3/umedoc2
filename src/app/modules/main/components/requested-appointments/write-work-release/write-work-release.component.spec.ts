import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteWorkReleaseComponent } from './write-work-release.component';

describe('WriteWorkReleaseComponent', () => {
  let component: WriteWorkReleaseComponent;
  let fixture: ComponentFixture<WriteWorkReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteWorkReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteWorkReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
