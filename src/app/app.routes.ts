import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuario/usuario.routes').then(m => m.USUARIO_ROUTES)
    },
    {
        path: 'eventos',
        loadChildren: () => import('./pages/eventos/evento.routes').then(m => m.EVENTO_ROUTES)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
