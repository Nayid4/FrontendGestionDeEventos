import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/models/usuario.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { BuscarUsuarioPipe } from '../../../shared/pipes/buscar-usuario.pipe';
import { TarjetaUsuarioComponent } from '../../../shared/components/tarjeta-usuario/tarjeta-usuario.component';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [
    TableModule, 
    CommonModule, 
    ButtonModule, 
    RouterModule, 
    InputIconModule, 
    IconFieldModule, 
    InputTextModule,
    PaginatorModule,
    BuscarUsuarioPipe,
    TarjetaUsuarioComponent
  ],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit{

  listaUsuario: Usuario[] = []
  busqueda: string = '';

  constructor(private servicioUsuario: UsuarioService){}

  ngOnInit(): void {
    this.servicioUsuario.ListarTodos().subscribe({
      next: (usuarios: Usuario[]) => {
        this.listaUsuario = usuarios
      }
    })
  }

}
