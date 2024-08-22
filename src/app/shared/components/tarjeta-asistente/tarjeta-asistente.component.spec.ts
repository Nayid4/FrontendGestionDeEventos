import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaAsistenteComponent } from './tarjeta-asistente.component';

describe('TarjetaAsistenteComponent', () => {
  let component: TarjetaAsistenteComponent;
  let fixture: ComponentFixture<TarjetaAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaAsistenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
