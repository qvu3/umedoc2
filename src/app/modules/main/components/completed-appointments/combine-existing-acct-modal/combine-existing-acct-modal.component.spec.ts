import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineExistingAcctModalComponent } from './combine-existing-acct-modal.component';

describe('CombineExistingAcctModalComponent', () => {
  let component: CombineExistingAcctModalComponent;
  let fixture: ComponentFixture<CombineExistingAcctModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineExistingAcctModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineExistingAcctModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
