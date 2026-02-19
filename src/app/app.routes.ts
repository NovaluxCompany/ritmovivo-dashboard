import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { LoginGuardian } from '../app/core/guard/login-guard';
import { GestionCourse } from './modules/cursos/components/gestion-course/gestion-course';
export const routes: Routes = [
    {path: '', component: Login},
    {path: 'cursos', component: GestionCourse, canActivate:[LoginGuardian]}

    //{path: '**'}
];
