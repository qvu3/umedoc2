import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProviderBackupComponent } from './change-provider-backup.component';

describe('ChangeProviderBackupComponent', () => {
  let component: ChangeProviderBackupComponent;
  let fixture: ComponentFixture<ChangeProviderBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeProviderBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProviderBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
