import { Provider, EnvironmentProviders, APP_INITIALIZER } from "@angular/core";
import { KeycloakEventType } from "keycloak-angular";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

export const initializeKeycloak = (keycloak: AuthService) => async () => {
    keycloak.keycloakEvents$.subscribe({
        next(event) {
            if (event.type == KeycloakEventType.OnTokenExpired) {
                keycloak.updateToken(20);
            }
        },
    });
    return keycloak.init({
        config: {
            url: environment.keycloak.authority,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri:
                window.location.origin + '/assets/silent-check-sso.html',
            checkLoginIframe: false
        },
    });
};

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [AuthService],
        },
    ];
};
