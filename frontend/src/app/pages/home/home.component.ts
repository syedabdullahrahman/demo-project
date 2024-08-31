import { NgIf } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [NgIf],
    styleUrl: './main-page.component.scss',
    template: `<div class="content">
                  <span class="title">Main page</span>
               </div>
               <a
                  *ngIf="!isLoggedIn"
                  role="button"
                  class="button"
                  (click)="redirectToLoginPage()"
                  >
                Log In
                </a>`,
  })
  export class MainPageComponent {
    get isLoggedIn(): boolean {
      return this.authenticationService.isLoggedIn();
    }
    constructor(private readonly authenticationService: AuthenticationService) {}
    redirectToLoginPage(): void {
      this.authenticationService.redirectToLoginPage();
    }
  }