import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoSecretarioComponent } from './voto-secretario.component';

describe('VotoSecretarioComponent', () => {
  let component: VotoSecretarioComponent;
  let fixture: ComponentFixture<VotoSecretarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotoSecretarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotoSecretarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
