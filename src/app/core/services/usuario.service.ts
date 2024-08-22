import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { comandoUsuario, Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericoService<Usuario, comandoUsuario> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "usuarios";
  }
}
