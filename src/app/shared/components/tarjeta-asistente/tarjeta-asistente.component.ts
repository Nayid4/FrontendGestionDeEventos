import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { NotificacionEvento } from '../../../core/models/notificacionEvento.model';

@Component({
  selector: 'app-tarjeta-asistente',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-asistente.component.html',
  styleUrl: './tarjeta-asistente.component.css'
})
export class TarjetaAsistenteComponent {
  @Input() usuario!: Usuario;
  @Output() notificacion = new EventEmitter<NotificacionEvento>();

  constructor(){}


  EliminarUsuario(usuario: Usuario): void {
    this.notificacion.emit({ estado: true, id: usuario.id });
    
  }
}
