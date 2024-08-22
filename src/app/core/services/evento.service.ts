import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { ComandoEvento, Evento } from '../models/evento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends GenericoService<Evento, ComandoEvento> {

  constructor(http: HttpClient) { 
    super(http);
    this.endpoint = "eventos";
  }

  ActualizarEvento(id: string, datos: ComandoEvento): Observable<void>{
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, datos);
  }

  filtrarPorCategoria(categoria: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.api}/${this.endpoint}/listar-por-categoria/${categoria}`);
  }

  filtrarPorFecha(fecha: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.api}/${this.endpoint}/listar-por-fecha/${fecha}`);
  }

  filtrarPorRangoDeFechas(fechaInicio: string, fechaFin: string): Observable<Evento[]> {
    return this.http.post<Evento[]>(`${this.api}/${this.endpoint}/listar-por-rango-de-fecha`, {fechaInicio, fechaFin});
  }

  obtenerEventosProximos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.api}/${this.endpoint}/listar-proximos-eventos`);
  }

}
