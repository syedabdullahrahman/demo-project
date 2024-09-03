import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
/**
 * We can also use keycloak-angular KeycloakAuthGuard too
 * https://www.npmjs.com/package/keycloak-angular#authguard
 *  */ 
export const AuthGuard: CanActivateFn = (): boolean => {
    const authenticationService = inject(AuthenticationService);
    if (authenticationService.isLoggedIn()) {
      return true;
    }
    authenticationService.redirectToLoginPage();
    return false;
  };