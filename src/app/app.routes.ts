import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { PruebaLogin } from './prueba-login/prueba-login';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'prueba', component: PruebaLogin}
    //{path: '**'}
];
