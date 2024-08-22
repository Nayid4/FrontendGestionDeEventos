import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../core/models/evento.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { BuscarEventoPipe } from '../../../shared/pipes/buscar-evento.pipe';
import { TarjetaEventoComponent } from '../../../shared/components/tarjeta-evento/tarjeta-evento.component';
import { NotificacionEvento } from '../../../core/models/notificacionEvento.model';

@Component({
  selector: 'app-lista-evento',
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
    FormsModule,
    BuscarEventoPipe,
    TarjetaEventoComponent
  ],
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  listaEvento: Evento[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';
  fechaSeleccionada: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  ordenAscendente: boolean = true;

  constructor(private servicioEvento: EventoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.servicioEvento.ListarTodos().subscribe({
      next: (eventos: Evento[]) => {
        this.listaEvento = eventos;
      }
    });
  }

  filtrarPorCategoria(): void {
    if (this.categoriaSeleccionada) {
      this.servicioEvento.filtrarPorCategoria(this.categoriaSeleccionada).subscribe({
        next: (eventos: Evento[]) => {
          this.listaEvento = eventos;
        }
      });
    } else {
      this.cargarEventos();
    }
  }

  filtrarPorFecha(): void {
    if (this.fechaSeleccionada) {
      this.servicioEvento.filtrarPorFecha(this.fechaSeleccionada).subscribe({
        next: (eventos: Evento[]) => {
          this.listaEvento = eventos;
        }
      });
    } else {
      this.cargarEventos();
    }
  }

  filtrarPorRangoDeFechas(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.servicioEvento.filtrarPorRangoDeFechas(this.fechaInicio, this.fechaFin).subscribe({
        next: (eventos: Evento[]) => {
          this.listaEvento = eventos;
        }
      });
    }
  }

  listarProximosEventos(): void {
    this.servicioEvento.obtenerEventosProximos().subscribe({
      next: (eventos: Evento[]) => {
        this.listaEvento = eventos;
      }
    });
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = '';
    this.fechaSeleccionada = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.cargarEventos();
  }

  notificacion(evento: NotificacionEvento): void {
    if (evento.estado) {
      this.listaEvento = this.listaEvento.filter(e => e.id !== evento.id);
      this.cdr.detectChanges();
    }
  }
}
