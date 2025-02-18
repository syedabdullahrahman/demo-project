import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTutorialComponent } from './pages/admin/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './pages/content/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './pages/content/tutorials-list/tutorials-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { LogoutScreenComponent } from './pages/logout-success/logout-success.component';
import { LogoutRouteGuard } from './auth/logout-guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AuthGuard } from './auth/guards/auth.guard';

export enum AppRoutes {
  Home = '',
  Tutorials = 'tutorials',
  TutorialsDetails = 'tutorials/:id',
  AddTutorials = 'add',
  Logout = 'logout',
  NotFound = '404',
  AccessDenied = 'access-denied',
  AnyOther = '**',
}

export const appRoutes: Routes = [
  { path: AppRoutes.Home, redirectTo: AppRoutes.Tutorials, pathMatch: 'full' },
  { path: AppRoutes.Tutorials, component: TutorialsListComponent },
  { path: AppRoutes.TutorialsDetails, component: TutorialDetailsComponent },
  { path: AppRoutes.AddTutorials, canActivate: [AuthGuard], component: AddTutorialComponent },
  { path: AppRoutes.AccessDenied, component: AccessDeniedComponent },
  {
    path: AppRoutes.Logout,
    canActivate: [LogoutRouteGuard],
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
