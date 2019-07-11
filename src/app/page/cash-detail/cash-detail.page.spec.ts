import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDetailPage } from './cash-detail.page';

describe('CashDetailPage', () => {
  let component: CashDetailPage;
  let fixture: ComponentFixture<CashDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
