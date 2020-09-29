import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papeleta3Component } from './papeleta3.component';

describe('Papeleta3Component', () => {
  let component: Papeleta3Component;
  let fixture: ComponentFixture<Papeleta3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Papeleta3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Papeleta3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
