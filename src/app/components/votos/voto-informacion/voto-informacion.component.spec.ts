import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoInformacionComponent } from './voto-informacion.component';

describe('VotoInformacionComponent', () => {
  let component: VotoInformacionComponent;
  let fixture: ComponentFixture<VotoInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
