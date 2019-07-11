import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpShopPage } from './set-up-shop.page';

describe('SetUpShopPage', () => {
  let component: SetUpShopPage;
  let fixture: ComponentFixture<SetUpShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
