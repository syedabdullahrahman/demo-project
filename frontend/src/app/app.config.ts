import { ApplicationConfig } from "@angular/core";
import { provideRouter, withPreloading, PreloadAllModules, withInMemoryScrolling } from "@angular/router";
import { environment } from "src/environments/environment";
import { appRoutes } from "./app.routes";
import { provideAuth } from "./auth/auth.provider";
import { MockTutorialService } from "./services/mock.tutorial.service";
import { TutorialService } from "./services/tutorial.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
        ),
        provideAuth(),
        {
            provide: TutorialService,
            useClass: environment.production ? TutorialService : MockTutorialService,
        }
    ],
};
