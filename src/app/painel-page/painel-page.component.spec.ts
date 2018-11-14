/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PainelPageComponent } from './painel-page.component';

describe('PainelPageComponent', () => {
  let component: PainelPageComponent;
  let fixture: ComponentFixture<PainelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
