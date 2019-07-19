import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPage } from './textarea.page';

describe('TextareaPage', () => {
  let component: TextareaPage;
  let fixture: ComponentFixture<TextareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
