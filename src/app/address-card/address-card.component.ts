import { Component, Input, OnInit } from '@angular/core';
import { AlertServiceService } from './alert-service.service';
import { User } from './user.model';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {

  user: any;
  @Input('name') userName: string='';

  @Input('user') inputUser: User = new User();
  randomNumber: number=0;
  inputText: string='Initial Text';
 
  constructor(private alertService: AlertServiceService) {
    
  }

  increamentNumber(){
    this.randomNumber++;
    this.alertService.giveAlert();
  }

  ngOnInit(): void {
    this.user = {
      name: this.userName,
      title: 'Software Developer',
      address: '123, Uttara',
      phone: [
      '123',
      '456',
      '789'
      ]
    };
  }

}
