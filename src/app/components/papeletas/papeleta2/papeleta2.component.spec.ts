import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papeleta2Component } from './papeleta2.component';

describe('Papeleta2Component', () => {
  let component: Papeleta2Component;
  let fixture: ComponentFixture<Papeleta2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Papeleta2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Papeleta2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
