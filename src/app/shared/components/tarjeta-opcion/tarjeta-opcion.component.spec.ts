import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaOpcionComponent } from './tarjeta-opcion.component';

describe('TarjetaOpcionComponent', () => {
  let component: TarjetaOpcionComponent;
  let fixture: ComponentFixture<TarjetaOpcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaOpcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
