import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificacionEvento } from '../../../core/models/notificacionEvento.model';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-usuario.component.html',
  styleUrl: './tarjeta-usuario.component.css'
})
export class TarjetaUsuarioComponent {
  @Input() usuario!: Usuario;
  @Output() notificacion = new EventEmitter<NotificacionEvento>();

  constructor(private servicioUsuario: UsuarioService, private route: Router){}

  ActualizarUsuario(usuario: Usuario){
    this.route.navigate(['/usuarios/actualizar-usuario', usuario.id])
  }

  EliminarUsuario(usuario: Usuario): void {
    this.servicioUsuario.Eliminar(usuario.id).subscribe({
      next: () => {
        this.notificacion.emit({ estado: true, id: usuario.id });
      }
    });
  }
}
