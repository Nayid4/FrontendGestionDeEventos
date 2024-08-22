import { Routes } from "@angular/router";
import { EventoLayoutComponent } from "./evento-layout/evento-layout.component";
import { ListaEventosComponent } from "./lista-eventos/lista-eventos.component";
import { FormularioEventosComponent } from "./formulario-eventos/formulario-eventos.component";

export const EVENTO_ROUTES: Routes = [
    {
        path: '',
        component: EventoLayoutComponent,
        children: [
            { path: '', component: ListaEventosComponent },
            { path: 'registrar-evento', component: FormularioEventosComponent},
            { path: 'actualizar-evento/:id', component: FormularioEventosComponent}
        ]
    }
]