import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService extends KeycloakService {

}
