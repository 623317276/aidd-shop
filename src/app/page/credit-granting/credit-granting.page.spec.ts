import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditGrantingPage } from './credit-granting.page';

describe('CreditGrantingPage', () => {
  let component: CreditGrantingPage;
  let fixture: ComponentFixture<CreditGrantingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditGrantingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditGrantingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
