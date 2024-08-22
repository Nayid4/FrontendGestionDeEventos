export interface Usuario {
    id: string,
    nombre: string,
    apellido: string,
    correo: string
    fechaCreacion: Date;
    fechaActualizacion: Date;
}

export interface comandoUsuario {
    nombre: string,
    apellido: string,
    correo: string
}