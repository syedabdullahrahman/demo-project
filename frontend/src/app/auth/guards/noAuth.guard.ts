import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, Router } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "../auth.service";

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);

    // Check the authentication status
    var isLoggedIn = inject(AuthService).isLoggedIn();

    if (isLoggedIn) {
        return of(router.parseUrl(''));
    } else {
        // Allow the access
        return of(true);
    }
};
