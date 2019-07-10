import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePayPswPage } from './change-pay-psw.page';

describe('ChangePayPswPage', () => {
  let component: ChangePayPswPage;
  let fixture: ComponentFixture<ChangePayPswPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePayPswPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePayPswPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
