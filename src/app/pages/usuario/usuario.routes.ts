import { Routes } from "@angular/router";
import { UsuarioLayoutComponent } from "./usuario-layout/usuario-layout.component";
import { ListaUsuarioComponent } from "./lista-usuario/lista-usuario.component";

export const USUARIO_ROUTES: Routes = [
    {
        path: '',
        component: UsuarioLayoutComponent,
        children:[
            { path: '', component:ListaUsuarioComponent }
        ]
    }
]