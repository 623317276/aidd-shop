import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareListPage } from './share-list.page';

describe('ShareListPage', () => {
  let component: ShareListPage;
  let fixture: ComponentFixture<ShareListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
