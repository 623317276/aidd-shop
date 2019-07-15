import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopPage } from './my-shop.page';

describe('MyShopPage', () => {
  let component: MyShopPage;
  let fixture: ComponentFixture<MyShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
