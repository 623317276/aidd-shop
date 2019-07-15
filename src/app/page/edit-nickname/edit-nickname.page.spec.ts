import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNicknamePage } from './edit-nickname.page';

describe('EditNicknamePage', () => {
  let component: EditNicknamePage;
  let fixture: ComponentFixture<EditNicknamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNicknamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNicknamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
