import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

//If logged in already then allow them to access home page else redirect to login page
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isUserLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

//If not logged in already then allow access to login/register page else redirect to home page
export const notLoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isUserLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/home');
    return false;
  }
};
