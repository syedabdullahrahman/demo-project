import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo-angular-project';

  isLoggedIn = false;
  username = '';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.userName;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.authService.logout();
  }
}
