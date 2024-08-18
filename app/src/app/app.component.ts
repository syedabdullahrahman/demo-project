import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo-angular-project';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  username() {
    return this.authService.userName;
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.redirectToLoginPage();
  }
}
