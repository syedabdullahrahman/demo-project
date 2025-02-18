import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AppRoutes } from "../app.routes";
import { AuthService } from "./auth.service";

export const LogoutRouteGuard: CanActivateFn = () => {
    const authenticationService = inject(AuthService);
    const router = inject(Router);
    if (!authenticationService.isLoggedIn()) {
      return true;
    } else {
      return router.createUrlTree([AppRoutes.Home]);
    }
  };