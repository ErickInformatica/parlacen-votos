import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosChangeRondaComponent } from './candidatos-change-ronda.component';

describe('CandidatosChangeRondaComponent', () => {
  let component: CandidatosChangeRondaComponent;
  let fixture: ComponentFixture<CandidatosChangeRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatosChangeRondaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosChangeRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
