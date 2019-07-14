import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthListPage } from './wealth-list.page';

describe('WealthListPage', () => {
  let component: WealthListPage;
  let fixture: ComponentFixture<WealthListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WealthListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
