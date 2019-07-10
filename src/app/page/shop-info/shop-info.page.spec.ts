import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoPage } from './shop-info.page';

describe('ShopInfoPage', () => {
  let component: ShopInfoPage;
  let fixture: ComponentFixture<ShopInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
