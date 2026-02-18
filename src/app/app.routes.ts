import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { LoginGuardian } from '../app/core/guard/login-guard';
import { GestionCursos } from './modules/cursos/components/gestion-cursos/gestion-cursos';
export const routes: Routes = [
    {path: '', component: Login},
    {path: 'cursos', component: GestionCursos, canActivate:[LoginGuardian]}

    //{path: '**'}
];
