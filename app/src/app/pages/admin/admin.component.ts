import { Component } from "@angular/core";

@Component({
    selector: 'app-protected-route',
    standalone: true,
    template: `
    <div class="content">
      <span class="title">Welcome {{ authenticationService.userName }}!</span>
      <span class="status-text">This is a protected route</span>
    </div>
  `
  })
  export class ProtectedRouteComponent {
    constructor(readonly authenticationService: AuthenticationService) {}
  }