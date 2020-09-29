import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papeleta1Component } from './papeleta1.component';

describe('Papeleta1Component', () => {
  let component: Papeleta1Component;
  let fixture: ComponentFixture<Papeleta1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Papeleta1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Papeleta1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
