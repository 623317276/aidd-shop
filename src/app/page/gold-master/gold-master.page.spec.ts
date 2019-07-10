import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldMasterPage } from './gold-master.page';

describe('GoldMasterPage', () => {
  let component: GoldMasterPage;
  let fixture: ComponentFixture<GoldMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldMasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
