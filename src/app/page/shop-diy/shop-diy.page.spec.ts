import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDiyPage } from './shop-diy.page';

describe('ShopDiyPage', () => {
  let component: ShopDiyPage;
  let fixture: ComponentFixture<ShopDiyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDiyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDiyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
