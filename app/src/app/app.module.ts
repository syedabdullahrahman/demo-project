import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { RouterModule } from '@angular/router';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialsListComponent,
    TutorialDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: TutorialService,
      useClass: environment.production ? TutorialService : MockTutorialService,
    },
  ],
})
export class AppModule {}
