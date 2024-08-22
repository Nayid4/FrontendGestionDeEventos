import { Component } from '@angular/core';
import { Opcion } from '../../core/models/opcion.model';
import { TarjetaOpcionComponent } from '../../shared/components/tarjeta-opcion/tarjeta-opcion.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TarjetaOpcionComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaOpciones: Opcion[] = [
    {
      id: 1,
      titulo: "Usuarios",
      icono: "pi pi-user",
      ruta: "/usuario",
      descripcion: "Gestiona Usuarios"
    },
    {
      id: 2,
      titulo: "Eventos",
      icono: "pi pi-calendar",
      ruta: "/inicio",
      descripcion: "Gestiona Eventos",
    }
  ]
}
