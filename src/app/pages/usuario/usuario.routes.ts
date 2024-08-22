import { Routes } from "@angular/router";
import { UsuarioLayoutComponent } from "./usuario-layout/usuario-layout.component";

export const USUARIO_ROUTES: Routes = [
    {
        path: '',
        component: UsuarioLayoutComponent,
        children:[
            
        ]
    }
]