import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLowerPage } from './my-lower.page';

describe('MyLowerPage', () => {
  let component: MyLowerPage;
  let fixture: ComponentFixture<MyLowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLowerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
