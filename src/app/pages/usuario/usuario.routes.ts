import { Routes } from "@angular/router";
import { UsuarioLayoutComponent } from "./usuario-layout/usuario-layout.component";
import { ListaUsuarioComponent } from "./lista-usuario/lista-usuario.component";
import { FormularioUsuarioComponent } from "./formulario-usuario/formulario-usuario.component";

export const USUARIO_ROUTES: Routes = [
    {
        path: '',
        component: UsuarioLayoutComponent,
        children:[
            { path: '', component:ListaUsuarioComponent },
            { path: 'registrar-usuario', component: FormularioUsuarioComponent },
            { path: 'actualizar-usuario/:id', component: FormularioUsuarioComponent }
        ]
    }
]