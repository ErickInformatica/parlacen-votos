import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoPresidenteComponent } from './voto-presidente.component';

describe('VotoPresidenteComponent', () => {
  let component: VotoPresidenteComponent;
  let fixture: ComponentFixture<VotoPresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoPresidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoPresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
