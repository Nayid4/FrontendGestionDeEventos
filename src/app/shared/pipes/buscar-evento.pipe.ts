import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../../core/models/evento.model';

@Pipe({
  name: 'buscarEvento',
  standalone: true
})
export class BuscarEventoPipe implements PipeTransform {

  transform(listaEventos: Evento[], entradaInput: string): Evento[] | undefined[] {
    entradaInput = entradaInput ? entradaInput.toLowerCase() : ''
    
    return entradaInput ? listaEventos.filter(valor => valor.titulo.toLowerCase()
    .includes(entradaInput))  : listaEventos

  }

}
