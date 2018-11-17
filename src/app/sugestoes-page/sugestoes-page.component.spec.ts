/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SugestoesPageComponent } from './sugestoes-page.component';

describe('SugestoesPageComponent', () => {
  let component: SugestoesPageComponent;
  let fixture: ComponentFixture<SugestoesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugestoesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestoesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
