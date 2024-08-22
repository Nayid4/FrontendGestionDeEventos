import { Routes } from "@angular/router";
import { EventoLayoutComponent } from "./evento-layout/evento-layout.component";

export const EVENTO_ROUTES: Routes = [
    {
        path: '',
        component: EventoLayoutComponent,
        children: [
            
        ]
    }
]