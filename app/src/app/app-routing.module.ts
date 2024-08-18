import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTutorialComponent } from './pages/admin/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './pages/content/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './pages/content/tutorials-list/tutorials-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LogoutScreenComponent } from './pages/logout-success/logout-success.component';

export enum AppRoutes {
  Home = '',
  Tutorials = 'tutorials',
  TutorialsDetails = 'tutorials/:id',
  AddTutorials = 'add',
  Logout = 'logout',
  NotFound = '404',
  AnyOther = '**',
}

const routes: Routes = [
  { path: AppRoutes.Home, redirectTo: AppRoutes.Tutorials, pathMatch: 'full' },
  { path: AppRoutes.Tutorials, component: TutorialsListComponent },
  { path: AppRoutes.TutorialsDetails, component: TutorialDetailsComponent },
  { path: AppRoutes.AddTutorials, component: AddTutorialComponent },
  {
    path: AppRoutes.Logout,
    component: LogoutScreenComponent,
  },
  {
    path: AppRoutes.AnyOther,
    redirectTo: AppRoutes.NotFound,
  },
  {
    path: AppRoutes.NotFound,
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
