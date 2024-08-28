import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddTutorialComponent } from './pages/admin/add-tutorial/add-tutorial.component';
import { TutorialsListComponent } from './pages/content/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './pages/content/tutorial-details/tutorial-details.component';
import { TutorialService } from './services/tutorial.service';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { MockTutorialService } from './services/mock.tutorial.service';
import { environment } from 'src/environments/environment';
import { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const initializeKeycloak = (keycloak: KeycloakService) => async () => {
  if (environment.keycloak.enable) {
    keycloak.init({
      config: {
        url: environment.keycloak.authority,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
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
          window.location.origin + '/assets/silent-check-sso.html',
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
    NotFoundComponent
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
      useClass: environment.production ? TutorialService : MockTutorialService,
    },
  ],
})
export class AppModule {}
