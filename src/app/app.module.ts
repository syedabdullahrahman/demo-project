import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { FormsModule } from '@angular/forms';
import { AlertServiceService } from './address-card/alert-service.service';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialService } from './services/tutorial.service';
import { APP_BASE_HREF } from '@angular/common';
import { MockTutorialService } from './services/mock.tutorial.service';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    AddressCardComponent,
    AddTutorialComponent,
    TutorialsListComponent,
    TutorialDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AlertServiceService,
    { provide: TutorialService, useClass: MockTutorialService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
