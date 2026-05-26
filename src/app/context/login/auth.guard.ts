import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (allowedRoles?: ('ADMIN' | 'STUDENT')[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = authService.userRole();
      if (!userRole || !allowedRoles.includes(userRole)) {
        // If they don't have the required role, send them to login or a default page
        return router.createUrlTree(['/login']);
      }
    }

    return true;
  };
};
