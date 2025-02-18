import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeycloakAngularModule,RouterModule,NgIf  ], // Import the standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo-angular-project';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  username() {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }
}
