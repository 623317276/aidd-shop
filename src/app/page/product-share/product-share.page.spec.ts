import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSharePage } from './product-share.page';

describe('ProductSharePage', () => {
  let component: ProductSharePage;
  let fixture: ComponentFixture<ProductSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
