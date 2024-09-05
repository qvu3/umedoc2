import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageContainerComponent } from './storage-container.component';

describe('StorageContainerComponent', () => {
  let component: StorageContainerComponent;
  let fixture: ComponentFixture<StorageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
