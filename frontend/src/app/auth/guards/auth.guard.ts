import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean => {
  const authenticationService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authenticationService.isLoggedIn()) {
    // Get user roles (or permissions) from the service
    const userRoles = authenticationService.getUserRoles();

    // Check if the user has required roles for this route
    const requiredRoles = route.data['roles'] as Array<string>;

    if (requiredRoles && requiredRoles.length > 0) {
      // Check if the user has at least one of the required roles
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

      if (hasRequiredRole) {
        return true; // User has required role(s), allow access
      } else {
        // User doesn't have the required roles, show error and redirect
        console.error("Access denied!");
        router.navigate(['/error/403']);  // Redirect to access denied page
        return false;  // Block access
      }
    }

    // No roles required for this route, so allow access
    return true;
  }

  // If the user is not logged in, redirect to login page
  authenticationService.login();
  router.navigate(['/login']);  // Redirect to login page
  return false;  // Block access
};

// Accept dependencies as parameters instead of using `inject()`
export const checkUserAccess = (route: string, roles: Array<string>): boolean => {

  const authenticationService = inject(AuthService);

  // Check if the user is logged in
  if (authenticationService.isLoggedIn()) {
    // Get user roles (or permissions) from the service
    const userRoles = authenticationService.getUserRoles();

    // Check if the user has required roles for this route
    const requiredRoles = roles;

    if (requiredRoles && requiredRoles.length > 0) {
      // Check if user has at least one of the required roles
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      if (hasRequiredRole) {
        return true;
      } else {
        // Show access denied error message using AlertService
        console.error("Access denied!");
        return false;  // User doesn't have the required roles
      }
    }

    // No roles required for this route, so just return true
    return true;
  }

  // If the user is not logged in, redirect to login
  authenticationService.login();  // This might be asynchronous, so consider returning a promise
  return false;
};