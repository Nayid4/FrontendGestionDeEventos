import { Component, Input } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-usuario.component.html',
  styleUrl: './tarjeta-usuario.component.css'
})
export class TarjetaUsuarioComponent {
  @Input() usuario!: Usuario;

  constructor(private servicioUsuario: UsuarioService){}

  ActualizarUsuario(usuario: Usuario){

  }

  EliminarUsuario(usuario: Usuario){

  }
}
