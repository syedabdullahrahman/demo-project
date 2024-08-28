# Keycloak Angular integration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Overview

This Angular project is a CRUD application that allows users to create, read, update, and delete tutorials. It integrates with Keycloak for user authentication d authorization.

## Keycloak setup

1. Run the following command to pull the Keycloak image from Docker Hub:

```bash
docker pull quay.io/keycloak/keycloak:latest
```

2. **Run the Keycloak Container**

    Use the following command to start a Keycloak container:

    ```bash
    docker run -d \
      --name keycloak \
      -p 8080:8080 \
      -e KEYCLOAK_USER=admin \
      -e KEYCLOAK_PASSWORD=admin \
      quay.io/keycloak/keycloak:latest start-dev
    ```

3. **Access the Keycloak Admin Console**

    Open your web browser and navigate to `http://localhost:8080/auth`.
    Log in using the admin credentials you provided (username: `admin`, password: `admin`).

    For this tutorial, the realm we created was called `Tutorial-web`,
    and the selected client ID was `angular-fe-client`.

## Stopping and Removing the Container

To stop the Keycloak container, run:

```bash
docker stop keycloak
```

To remove the container, run:

```bash
docker rm keycloak
```

## Keycloak Integration

Keycloak is used for managing authentication and authorization. Follow these steps to configure Keycloak for this project:

1. **Install Keycloak Angular Library**

    Install the Keycloak Angular library using npm:

    ```bash
    npm install keycloak-angular keycloak-js
    ```

2. **Configure Keycloak**

    Create a `authentication.service.ts` file in your desired directory ex. `app\src\app\services\authentication.service.ts` directory to configure Keycloak:

    ```typescript
    import { Injectable } from '@angular/core';
    import { KeycloakService } from 'keycloak-angular';
    import { environment } from 'src/environments/environment';

    @Injectable({
        providedIn: 'root',
    })
    export class AuthenticationService {
        constructor(private readonly keycloakService: KeycloakService) {}

        redirectToLoginPage(): Promise<void> {
            return this.keycloakService.login();
        }

        get userName(): string {
            return this.keycloakService.getUsername();
        }

        isLoggedIn(): boolean {
            return this.keycloakService.isLoggedIn();
        }

        logout(): void {
            this.keycloakService.logout(
                environment.keycloak.postLogoutRedirectUri
            );
        }
    }
    ```

3. **Initialize Keycloak**

    In your `app.module.ts`, import and initialize the Keycloak service:

    example: `app.module.ts`

    ```typescript
    export const initializeKeycloak =
        (keycloak: KeycloakService) => async () => {
            if (environment.keycloak.enable) {
                keycloak.init({
                    config: {
                        url: <KEYCLOAK_SERVER>,
                        realm: <REALM_NAME>,
                        clientId: <CLIENT_ID>,
                    },
                    // If set a false you cannot get any information about the user example the username
                    // if you use keycloakService.getUserName() you get this error
                    // User not logged in or user profile was not loaded.
                    loadUserProfileAtStartUp: true,
                    initOptions: {
                        //   This is an action we specified on keycloak load
                        //   We have two options : 'login-required'|'check-sso'
                        //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.

                        // onLoad: 'login-required',
                        // checkLoginIframe: true,

                        //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
                        //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
                        // <html>
                        //    <body>
                        //         <script>
                        //           parent.postMessage(location.href, location.origin);
                        //         </script>
                        //      </body>
                        // </html>
                        onLoad: 'check-sso',
                        silentCheckSsoRedirectUri:
                            window.location.origin +
                            '/assets/silent-check-sso.html',
                        checkLoginIframe: false,
                        redirectUri: environment.keycloak.redirectUri,
                    },
                    // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
                    // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
                    bearerExcludedUrls: ['/assets'],
                });
            }
        };

    @NgModule({
        bootstrap: [AppComponent],
        declarations: [
            AppComponent,
            AddTutorialComponent,
            TutorialsListComponent,
            TutorialDetailsComponent,
            AccessDeniedComponent,
            NotFoundComponent,
            //or Other components as per requirement...
        ],
        imports: [
            BrowserModule,
            KeycloakAngularModule, //Import KeycloakAngularModule to be available to the project
            CommonModule,
            BrowserModule,
            AppRoutingModule,
            FormsModule,
        ],
        providers: [
            //Initialize keyclaok service
            {
                provide: APP_INITIALIZER,
                useFactory: initializeKeycloak,
                multi: true,
                deps: [KeycloakService],
            },
            { provide: APP_BASE_HREF, useValue: '/' },
            {
                provide: TutorialService,
                useClass: environment.production
                    ? TutorialService
                    : MockTutorialService,
            },
        ],
    })
    export class AppModule {}
    ```
    Replace `<KEYCLOAK_SERVER>`, `<REALM_NAME>`, and `<CLIENT_ID>` with your Keycloak server URL, realm name, and client ID respectively.

4. **Protect Routes**

    To protect your routes, use the Keycloak `AuthGuard`:

    ```typescript
    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';
    import { KeycloakService } from 'keycloak-angular';

    @Injectable({
        providedIn: 'root',
    })
    export class AuthGuard implements CanActivate {
        constructor(
            private keycloakService: KeycloakService,
            private router: Router
        ) {}

        async canActivate(): Promise<boolean> {
            if (this.keycloakService.isLoggedIn()) {
                return true;
            } else {
                await this.keycloakService.login();
                return false;
            }
        }
    }
    ```

    Apply the `AuthGuard` to routes you want to protect in your routing module:

    ```typescript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
    import { TutorialEditComponent } from './tutorial-edit/tutorial-edit.component';
    import { AuthGuard } from './auth.guard';

    const routes: Routes = [
        {
            path: 'tutorials',
            component: TutorialListComponent,
        },
        {
            path: 'edit/:id',
            component: TutorialEditComponent,
            canActivate: [AuthGuard],
        },
        // other routes...
    ];

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    })
    export class AppRoutingModule {}
    ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end sting capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
