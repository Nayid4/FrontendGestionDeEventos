import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento, ComandoEvento } from '../../../core/models/evento.model';
import { EventoService } from '../../../core/services/evento.service';
import { Usuario } from '../../../core/models/usuario.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-eventos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-eventos.component.html',
  styleUrls: ['./formulario-eventos.component.css']
})
export class FormularioEventosComponent implements OnInit {

  formulario: FormGroup;
  eventoId?: string;
  usuarios: Usuario[] = []; // Asignar usuarios si es necesario

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioMensaje: MessageService
  ) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      asistentes: [[]] // Puedes inicializar con una lista de usuarios si es necesario
    });
  }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.eventoId) {
      this.cargarEvento();
    }
    // Cargar lista de usuarios si es necesario
  }

  cargarEvento(): void {
    if (this.eventoId) {
      this.eventoService.ListarPorId(this.eventoId).subscribe(evento => {
        this.formulario.patchValue({
          titulo: evento.titulo,
          categoria: evento.categoria,
          descripcion: evento.descripcion,
          fecha: this.formatearFecha(evento.fecha),
          horaInicio: this.formatearHora(evento.horaInicio),
          horaFin: this.formatearHora(evento.horaFin),
          lugar: evento.lugar,
          asistentes: evento.asistentes.map(asistente => asistente.id)
        });
      });
    }
  }

  formatearFecha(fecha: string): string {
    return fecha.split('T')[0]; // yyyy-mm-dd
  }

  formatearHora(hora: string): string {
    return hora.substring(0, 5); // hh:mm
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const comandoEvento: Evento = {
        ...this.formulario.value,
        id: this.eventoId || undefined // Asigna la ID si está presente
      };
      if (this.eventoId) {
        this.eventoService.Actualizar(this.eventoId, comandoEvento).subscribe(() => {
          this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Evento actualizado correctamente!' });
          this.router.navigate(['/eventos']);
        });
      } else {
        this.eventoService.Crear(comandoEvento).subscribe(() => {
          this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Evento registrado correctamente!' });
          this.router.navigate(['/eventos']);
        });
      }
    }
  }

  cancelar(): void {
    if (this.eventoId) {
      this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: 'Actualización de evento cancelada!' });
    } else {
      this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: 'Registro de evento cancelado!' });
    }
    this.router.navigate(['/eventos']);
  }
}
