import { Usuario } from "./usuario.model";

export interface Evento {
    id: string;
    titulo: string;
    categoria: string;
    descripcion: string;
    fecha: string;
    horaInicio: string; 
    horaFin: string;
    lugar: string;
    asistentes: Usuario[];
    fechaCreacion: Date;
    fechaActualizacion: Date;
}

export interface ComandoEvento {
    titulo: string;
    categoria: string;
    descripcion: string;
    fecha: string;
    horaInicio: string; 
    horaFin: string;
    lugar: string;
    asistentes: comandoAsistente[];
}

export interface comandoAsistente{
    id: string
}
