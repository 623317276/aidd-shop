import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePagePage } from './share-page.page';

describe('SharePagePage', () => {
  let component: SharePagePage;
  let fixture: ComponentFixture<SharePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
