import { Routes } from '@angular/router';
import { LoginComponent } from './context/login/login.component';
import { authGuard } from './context/login/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadComponent: () => import('./context/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard(['ADMIN'])]
  },
  {
    path: 'student',
    loadComponent: () => import('./context/student/student.component').then(m => m.StudentComponent),
    canActivate: [authGuard(['STUDENT'])]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
