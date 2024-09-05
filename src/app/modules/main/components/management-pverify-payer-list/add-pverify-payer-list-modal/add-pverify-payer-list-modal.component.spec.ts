import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPverifyPayerListModalComponent } from './add-pverify-payer-list-modal.component';

describe('AddPverifyPayerListModalComponent', () => {
  let component: AddPverifyPayerListModalComponent;
  let fixture: ComponentFixture<AddPverifyPayerListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPverifyPayerListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPverifyPayerListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
