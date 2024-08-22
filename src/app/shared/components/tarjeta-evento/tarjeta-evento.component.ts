import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from '../../../core/models/evento.model';
import { EventoService } from '../../../core/services/evento.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionEvento } from '../../../core/models/notificacionEvento.model';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrls: ['./tarjeta-evento.component.css']
})
export class TarjetaEventoComponent {
  @Input() evento!: Evento;
  @Output() notificacion = new EventEmitter<NotificacionEvento>();

  constructor(private servicioEvento: EventoService, private route: Router) {}

  ActualizarEvento(evento: Evento) {
    this.route.navigate(['/eventos/actualizar-evento', evento.id]);
  }

  EliminarEvento(evento: Evento): void {
    this.servicioEvento.Eliminar(evento.id).subscribe({
      next: () => {
        this.notificacion.emit({ estado: true, id: evento.id });
      }
    });
  }
}
