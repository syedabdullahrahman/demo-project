import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'app-unprotected-route',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="content">
      <span class="title">Welcome {{ username }}!</span>
      <span class="status-text">This is an unprotected route</span>
    </div>
  `
  })
  export class UnprotectedRouteComponent {
    get username(): string {
      return this.authenticationService.isLoggedIn()
        ? this.authenticationService.userName
        : 'friend';
    }
    constructor(readonly authenticationService: AuthenticationService) {}
  }