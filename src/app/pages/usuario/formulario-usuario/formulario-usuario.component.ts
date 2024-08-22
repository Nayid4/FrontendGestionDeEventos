import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { comandoUsuario, Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormularioUsuarioComponent implements OnInit {

  id: string | null = null;
  usuario!: Usuario;
  formulario!: FormGroup;
  textoConfirmar!: string;

  constructor(
    private route: ActivatedRoute,
    private servicioUsuario: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private servicioMensaje: MessageService
  ) {}

  ngOnInit(): void {
    this.formularioRegistro();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.textoConfirmar = "Actualizar";

      this.servicioUsuario.ListarPorId(this.id).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp;
          this.formularioActualizacion(resp);
        }
      });
    } else {
      this.textoConfirmar = "Registrar";
    }
  }

  formularioRegistro(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  formularioActualizacion(usuario: Usuario): void {
    this.formulario.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const datos = this.formulario.value;

      if (this.id) {
        const datosFormulario: Usuario = {
          id: this.id,
          nombre: datos.nombre,
          apellido: datos.apellido,
          correo: datos.correo,
          fechaCreacion: this.usuario.fechaCreacion,
          fechaActualizacion: new Date(), // Actualizado automáticamente
        };

        this.servicioUsuario.Actualizar(this.id, datosFormulario).subscribe({
          next: () => {
            this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado!' });
            this.servicioUsuario.notifyUpdate(datosFormulario); // Notificar el cambio
            this.router.navigate(['/usuarios']);
          }
        });
      } else {
        const datosFormulario: comandoUsuario = {
          nombre: datos.nombre,
          apellido: datos.apellido,
          correo: datos.correo,
        };

        this.servicioUsuario.Crear(datosFormulario).subscribe({
          next: () => {
            this.servicioMensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado!' });
            this.servicioUsuario.notifyRegistro(datosFormulario); // Notificar el cambio
            this.router.navigate(['/usuarios']);
          }
        });
      }
    } else {
      this.servicioMensaje.add({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos!' });
    }
  }

  cancelar(): void {
    if (this.id) {
      this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: 'Actualización de usuario cancelada!' });
    } else {
      this.servicioMensaje.add({ severity: 'info', summary: 'Info', detail: 'Registro de usuario cancelado!' });
    }
    this.router.navigate(['/usuarios']);
  }
}
