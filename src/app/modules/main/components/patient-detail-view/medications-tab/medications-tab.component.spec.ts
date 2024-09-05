import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsTabComponent } from './medications-tab.component';

describe('MedicationsTabComponent', () => {
  let component: MedicationsTabComponent;
  let fixture: ComponentFixture<MedicationsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
