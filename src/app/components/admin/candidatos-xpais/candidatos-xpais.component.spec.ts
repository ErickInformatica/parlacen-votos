import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosXPaisComponent } from './candidatos-xpais.component';

describe('CandidatosXPaisComponent', () => {
  let component: CandidatosXPaisComponent;
  let fixture: ComponentFixture<CandidatosXPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatosXPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosXPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
