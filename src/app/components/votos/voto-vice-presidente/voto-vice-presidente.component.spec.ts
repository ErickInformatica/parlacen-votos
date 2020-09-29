import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoVicePresidenteComponent } from './voto-vice-presidente.component';

describe('VotoVicePresidenteComponent', () => {
  let component: VotoVicePresidenteComponent;
  let fixture: ComponentFixture<VotoVicePresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoVicePresidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoVicePresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
