import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento, ComandoEvento } from '../../../core/models/evento.model';
import { EventoService } from '../../../core/services/evento.service';
import { Usuario } from '../../../core/models/usuario.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from '../../../core/services/usuario.service';
import { DropdownModule } from 'primeng/dropdown';
import { categorias } from '../../../assets/categorias.json'
import { TarjetaAsistenteComponent } from '../../../shared/components/tarjeta-asistente/tarjeta-asistente.component';
import { NotificacionEvento } from '../../../core/models/notificacionEvento.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-formulario-eventos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TarjetaAsistenteComponent,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  templateUrl: './formulario-eventos.component.html',
  styleUrls: ['./formulario-eventos.component.css']
})
export class FormularioEventosComponent implements OnInit {
  formulario!: FormGroup;
  eventoId?: string;
  usuarios: Usuario[] = []; // Lista de usuarios disponibles
  asistentes: Usuario[] = [];
  selectedUsuarioId: string | null = null; // ID de usuario seleccionado para añadir
  textoConfirmar!: string;
  Categorias!: string[];

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioMensaje: MessageService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
    this.eventoId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.eventoId) {
      this.textoConfirmar = "Actualizar";
      this.cargarEvento();
    } else {
      this.textoConfirmar = "Registrar";
    }
    this.cargarUsuarios();
    this.cargarCategorias();
  }

  cargarFormulario(): void {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      asistente: ['']
    });
  }

  cargarCategorias(): void {
    this.Categorias = categorias;
  }

  cargarEvento(): void {
    if (this.eventoId) {
      this.eventoService.ListarPorId(this.eventoId).subscribe({
        next: (evento) => {
          this.formulario.patchValue({
            id: evento.id,
            titulo: evento.titulo,
            categoria: evento.categoria,
            descripcion: evento.descripcion,
            fecha: this.formatearFecha(evento.fecha),
            horaInicio: this.formatearHora(evento.horaInicio),
            horaFin: this.formatearHora(evento.horaFin),
            lugar: evento.lugar
          });
          this.asistentes = evento.asistentes;
        }
      });
    }
  }

  cargarUsuarios(): void {
    this.usuarioService.ListarTodos().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  formatearFecha(fecha: string): string {
    return fecha.split('T')[0]; // yyyy-mm-dd
  }

  formatearHora(hora: string): string {
    return hora.substring(0, 5); // hh:mm
  }

  agregarAsistente(): void {
    const usuarioId = this.formulario.get('asistente')?.value; // Obtener el id del usuario seleccionado
    console.log(usuarioId);
    console.log(this.usuarios);
    if (usuarioId && !this.asistentes.some(u => u.id === usuarioId)) {
      const usuario = this.usuarios.find(u => u.id === usuarioId);
      if (usuario) {
        this.asistentes.push(usuario);
        console.log('Asistente añadido:', usuario);
        this.selectedUsuarioId = "";
        this.formulario.get('asistente')?.reset(); // Resetear el select
      }
    }else{
      this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: "Seleccione un asistente!" });
    }
    
  }

  eliminarAsistente(evento: NotificacionEvento): void {
    
    if (evento.estado) {
      this.asistentes = this.asistentes.filter(u => u.id !== evento.id);
      this.cdr.detectChanges();
    }
  }

  onSubmit(): void {
    
    if (this.formulario.valid) {
      this.confirmationService.confirm({
        message: `¿Está seguro de que desea ${this.textoConfirmar.toLowerCase()} este evento?`,
        accept: () => {
          const comandoEvento: ComandoEvento = {
            ...this.formulario.value,
            id: this.eventoId,
            asistentes: this.asistentes.map(asistente => ({ id: asistente.id })) // Convertir usuarios a comandoAsistente
          };

          if (this.eventoId) {
            this.eventoService.ActualizarEvento(this.eventoId, comandoEvento).subscribe(() => {
              this.router.navigate(['/eventos']);
              this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Evento actualizado correctamente' });
            });
          } else {
            this.eventoService.Crear(comandoEvento).subscribe(() => {
              this.router.navigate(['/eventos']);
              this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Evento registrado correctamente' });
            });
          }
        },
        reject: () => {
          this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: 'Acción cancelada' });
        }
      });
    } else {
      this.servicioMensaje.add({ severity: 'error', summary: 'Error', detail: 'Completa los campos!' });
    }
  }

  cancelar(): void {
    const mensaje = this.eventoId
      ? 'Actualización de evento cancelada!'
      : 'Registro de evento cancelado!';
    this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: mensaje });
    this.router.navigate(['/eventos']);
  }
}