import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { LoginGuardian } from '../app/core/guard/login-guard';
import { ManagementCourse } from './modules/cursos/components/management-course/management-course';
import { PaymentsReport } from './modules/reports/components/payments-report/payments-reports';
import { EnrolledReport } from './modules/reports/components/enrolled-report/enrolled-report';
export const routes: Routes = [
    {path: '', component: Login},
    {path: 'cursos', component: ManagementCourse, canActivate:[LoginGuardian]},
    {path: 'pagos', component: PaymentsReport, canActivate:[LoginGuardian]},
    {path: 'inscritos', component: EnrolledReport, canActivate:[LoginGuardian]},
    //{path: '**'}
];
