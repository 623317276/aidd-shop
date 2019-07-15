import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditGoodsPage } from './manage-edit-goods.page';

describe('ManageEditGoodsPage', () => {
  let component: ManageEditGoodsPage;
  let fixture: ComponentFixture<ManageEditGoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEditGoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditGoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
