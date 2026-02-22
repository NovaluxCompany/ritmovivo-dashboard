import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { LoginGuardian } from '../app/core/guard/login-guard';
import { ManagementCourse } from './modules/cursos/components/management-course/management-course';
import { Reports } from './modules/reports/components/managment-report-payments/payments-reports';
export const routes: Routes = [
    {path: '', component: Login},
    {path: 'cursos', component: ManagementCourse, canActivate:[LoginGuardian]},
    {path: 'reportes', component: Reports, canActivate:[LoginGuardian]}
    //{path: '**'}
];
