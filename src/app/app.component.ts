import { Component } from '@angular/core';
import { User } from './address-card/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular-project';
  user : User;

  constructor(){
    this.user = new User();
    this.user.name="Sample Name";
    this.user.designation="Tester";
    this.user.address="123, Dhaka-1230";
    this.user.phone=['123','456','789'];
  }
  
}
