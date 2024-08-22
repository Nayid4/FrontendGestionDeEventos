import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Opcion } from '../../../core/models/opcion.model';

@Component({
  selector: 'app-tarjeta-opcion',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tarjeta-opcion.component.html',
  styleUrl: './tarjeta-opcion.component.css'
})
export class TarjetaOpcionComponent {
  @Input() info!: Opcion
}
